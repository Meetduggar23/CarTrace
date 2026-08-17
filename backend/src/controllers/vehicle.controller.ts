import type { Request, Response } from "express";
import type { AuthedRequest } from "../middleware/auth";
import { vehicleService } from "../services/vehicle.service";
import { asyncHandler } from "../utils/async-handler";
import { registrationSchema, vinSchema } from "../validators/schemas";

function userIdOf(req: Request): string | undefined {
  return (req as AuthedRequest).userId;
}

export const searchRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const { registrationNumber } = registrationSchema.parse(req.body);
    const result = await vehicleService.searchRegistration(registrationNumber, {
      userId: userIdOf(req),
    });
    res.json({ data: result });
  }
);

export const searchRegistrationByPath = asyncHandler(
  async (req: Request, res: Response) => {
    const registrationNumber = String(req.params.registration ?? "");
    const result = await vehicleService.searchRegistration(registrationNumber, {
      userId: userIdOf(req),
    });
    res.json({ data: result });
  }
);

export const decodeVin = asyncHandler(async (req: Request, res: Response) => {
  const { vin } = vinSchema.parse(req.body);
  const result = await vehicleService.decodeVin(vin, {
    userId: userIdOf(req),
  });
  res.json({ data: result });
});

export const decodeVinByPath = asyncHandler(
  async (req: Request, res: Response) => {
    const vin = String(req.params.vin ?? "");
    const result = await vehicleService.decodeVin(vin, {
      userId: userIdOf(req),
    });
    res.json({ data: result });
  }
);
