import type { Request, Response } from "express";
import type { AuthedRequest } from "../middleware/auth";
import { userService } from "../services/user.service";
import type { VehicleRecord } from "../types/vehicle";
import { asyncHandler } from "../utils/async-handler";
import {
  loginSchema,
  registerSchema,
  renameVehicleSchema,
  saveVehicleSchema,
} from "../validators/schemas";

// --- Auth ---

export const register = asyncHandler(async (req: Request, res: Response) => {
  const input = registerSchema.parse(req.body);
  const result = await userService.register(input);
  res.status(201).json({ data: result });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const input = loginSchema.parse(req.body);
  const result = await userService.login(input);
  res.json({ data: result });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const authed = req as AuthedRequest;
  const user = await userService.me(authed.userId!);
  res.json({ data: { user } });
});

// --- Saved vehicles ---

export const listVehicles = asyncHandler(
  async (req: Request, res: Response) => {
    const authed = req as AuthedRequest;
    const vehicles = await userService.listVehicles(authed.userId!);
    res.json({ data: { vehicles } });
  }
);

export const saveVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    const authed = req as AuthedRequest;
    const input = saveVehicleSchema.parse(req.body);
    const record = input.record as unknown as VehicleRecord;
    const vehicle = await userService.saveVehicle(
      authed.userId!,
      record,
      input.customName
    );
    res.status(201).json({ data: { vehicle } });
  }
);

export const renameVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    const authed = req as AuthedRequest;
    const input = renameVehicleSchema.parse(req.body);
    const vehicle = await userService.renameVehicle(
      authed.userId!,
      String(req.params.id),
      input.customName
    );
    res.json({ data: { vehicle } });
  }
);

export const deleteVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    const authed = req as AuthedRequest;
    const result = await userService.deleteVehicle(
      authed.userId!,
      String(req.params.id)
    );
    res.json({ data: result });
  }
);

// --- History ---

export const listHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const authed = req as AuthedRequest;
    const history = await userService.listHistory(authed.userId!);
    res.json({ data: { history } });
  }
);

export const clearHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const authed = req as AuthedRequest;
    const result = await userService.clearHistory(authed.userId!);
    res.json({ data: result });
  }
);
