import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
    // Mask sensitive query values (VINs, registration numbers) in logs.
    const url = req.originalUrl.replace(
      /([?&](?:vin|registrationNumber|registration|q|query)=)[^&]+/gi,
      "$1<redacted>"
    );
    logger[level](`${req.method} ${url} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
}
