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
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const saveVehicleSchema = z.object({
  record: z.record(z.string(), z.unknown()).refine((v) => Object.keys(v).length > 0, {
    message: "Vehicle record is required",
  }),
  customName: z.string().trim().max(100).optional(),
});

export const renameVehicleSchema = z.object({
  customName: z.string().trim().max(100, "Name is too long"),
});
