import type { Request, Response } from "express";
import { providerManager } from "../providers/provider-manager";
import { asyncHandler } from "../utils/async-handler";

export const getProviders = asyncHandler(
  async (_req: Request, res: Response) => {
    const providers = await providerManager.getProviderInfo();
    res.json({ data: providers });
  }
);
