import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { AppError, isAppError } from "../types/errors";
import { logger } from "../utils/logger";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.path} not found.`,
    },
  });
};

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req,
  res,
  _next
) => {
  if (isAppError(err)) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request body.",
        details: err.flatten().fieldErrors,
      },
    });
    return;
  }

  // Prisma errors when the database is unavailable
  if (
    err instanceof Error &&
    (err.name === "PrismaClientInitializationError" ||
      err.name === "PrismaClientKnownRequestError" ||
      err.name === "PrismaClientRustPanicError" ||
      /Prisma/i.test(err.message))
  ) {
    logger.error("[db] Prisma error", { error: err.message });
    res.status(503).json({
      error: {
        code: "DATABASE_REQUIRED",
        message:
          "The database is currently unavailable. Please try again later.",
      },
    });
    return;
  }

  const appError = err as AppError;
  logger.error("Unhandled error", {
    message: appError.message ?? String(err),
    stack: appError.stack,
  });
  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Something went wrong on our side. Please try again later.",
    },
  });
};
