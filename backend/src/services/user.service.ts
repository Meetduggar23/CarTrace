import { hashPassword, verifyPassword } from "../auth/password";
import { signToken } from "../auth/jwt";
import { getPrisma } from "../db/prisma";
import {
  ConflictError,
  DatabaseRequiredError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../types/errors";
import { requireValidRegistration, requireValidVin } from "../utils/validation";
import type { Prisma } from "../generated/prisma";
import type { VehicleRecord } from "../types/vehicle";

function requireDb() {
  const prisma = getPrisma();
  if (!prisma) {
    throw new DatabaseRequiredError(
      "This feature requires a database to be configured (DATABASE_URL)."
    );
  }
  return prisma;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export class UserService {
  async register(input: RegisterInput) {
    const prisma = requireDb();
    const email = input.email.trim().toLowerCase();
    const name = input.name.trim();
    if (!name || name.length < 2) {
      throw new ValidationError("Name must be at least 2 characters.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ValidationError("Please enter a valid email address.");
    }
    if (input.password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters.");
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictError("An account with this email already exists.");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hashPassword(input.password),
      },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return { user, token: signToken({ sub: user.id, email: user.email, name: user.name }) };
  }

  async login(input: LoginInput) {
    const prisma = requireDb();
    const email = input.email.trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedError("Invalid email or password.");
    }
    const ok = await verifyPassword(input.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedError("Invalid email or password.");
    }
    return {
      user: { id: user.id, name: user.name, email: user.email },
      token: signToken({ sub: user.id, email: user.email, name: user.name }),
    };
  }

  async me(userId: string) {
    const prisma = requireDb();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    if (!user) throw new NotFoundError("User not found.");
    return user;
  }

  // --- Saved vehicles ---

  async listVehicles(userId: string) {
    const prisma = requireDb();
    return prisma.vehicle.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async saveVehicle(
    userId: string,
    record: VehicleRecord,
    customName?: string
  ) {
    const prisma = requireDb();
    const registrationNumber = record.registrationNumber
      ? requireValidRegistration(record.registrationNumber)
      : null;
    const vin = record.vin ? requireValidVin(record.vin) : null;
    if (!registrationNumber && !vin) {
      throw new ValidationError(
        "A saved vehicle needs a registration number or VIN."
      );
    }

    const existing = await prisma.vehicle.findFirst({
      where: {
        userId,
        OR: [
          ...(registrationNumber ? [{ registrationNumber }] : []),
          ...(vin ? [{ vin }] : []),
        ],
      },
    });
    if (existing) {
      throw new ConflictError("This vehicle is already in your saved list.");
    }

    return prisma.vehicle.create({
      data: {
        userId,
        registrationNumber,
        vin,
        manufacturer: record.manufacturer,
        model: record.model,
        modelYear: record.modelYear,
        fuelType: record.fuelType,
        customName: customName?.trim() || null,
        vehicleData: record as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async renameVehicle(userId: string, vehicleId: string, customName: string) {
    const prisma = requireDb();
    const vehicle = await prisma.vehicle.findFirst({
      where: { id: vehicleId, userId },
    });
    if (!vehicle) {
      throw new NotFoundError("Saved vehicle not found.");
    }
    return prisma.vehicle.update({
      where: { id: vehicleId },
      data: { customName: customName.trim() || null },
    });
  }

  async deleteVehicle(userId: string, vehicleId: string) {
    const prisma = requireDb();
    const vehicle = await prisma.vehicle.findFirst({
      where: { id: vehicleId, userId },
    });
    if (!vehicle) {
      throw new NotFoundError("Saved vehicle not found.");
    }
    await prisma.vehicle.delete({ where: { id: vehicleId } });
    return { deleted: true };
  }

  // --- Search history ---

  async listHistory(userId: string) {
    const prisma = requireDb();
    return prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }

  async clearHistory(userId: string) {
    const prisma = requireDb();
    await prisma.searchHistory.deleteMany({ where: { userId } });
    return { deleted: true };
  }

}

export const userService = new UserService();
