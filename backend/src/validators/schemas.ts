import { z } from "zod";

export const registrationSchema = z.object({
  registrationNumber: z
    .string()
    .trim()
    .min(1, "Registration number is required")
    .max(20, "Registration number is too long"),
});

export const vinSchema = z.object({
  vin: z
    .string()
    .trim()
    .min(1, "VIN is required")
    .max(20, "VIN is too long"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (p) => Buffer.byteLength(p, "utf8") <= 72,
      "Password is too long for secure storage"
    ),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const boundedString = z.string().max(200).nullable().optional();

export const saveVehicleSchema = z.object({
  record: z
    .object({
      id: z.string().max(100).optional(),
      lookupType: z.enum(["registration", "vin"]).optional(),
      registrationNumber: z.string().max(20).nullable().optional(),
      vin: z.string().max(20).nullable().optional(),
      manufacturer: boundedString,
      make: boundedString,
      model: boundedString,
      variant: boundedString,
      modelYear: z.string().max(10).nullable().optional(),
      state: boundedString,
      city: boundedString,
      rtoCode: z.string().max(20).nullable().optional(),
      rtoName: boundedString,
      fuelType: boundedString,
      bodyType: boundedString,
      transmission: boundedString,
      driveType: boundedString,
      source: boundedString,
      sourceTimestamp: z.string().max(100).nullable().optional(),
      isMock: z.boolean().optional(),
    })
    .passthrough()
    .refine((v) => Object.keys(v).length > 0, {
      message: "Vehicle record is required",
    })
    .refine((v) => JSON.stringify(v).length <= 100_000, {
      message: "Vehicle record is too large",
    }),
  customName: z.string().trim().max(100).optional(),
});

export const renameVehicleSchema = z.object({
  customName: z.string().trim().max(100, "Name is too long"),
});
