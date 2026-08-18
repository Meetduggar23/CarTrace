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

  // Malformed JSON bodies (body-parser) -> 400 instead of an opaque 500.
  if (
    err instanceof SyntaxError &&
    "type" in err &&
    (err as { type?: string }).type === "entity.parse.failed"
  ) {
    res.status(400).json({
      error: {
        code: "INVALID_JSON",
        message: "Request body is not valid JSON.",
      },
    });
    return;
  }

  // Bodies over the size limit -> 413 instead of an opaque 500.
  if (
    err instanceof Error &&
    "type" in err &&
    (err as { type?: string }).type === "entity.too.large"
  ) {
    res.status(413).json({
      error: {
        code: "PAYLOAD_TOO_LARGE",
        message: "Request body is too large.",
      },
    });
    return;
  }

  // Prisma validation errors (bad data passed to the DB) -> 400.
  if (
    err instanceof Error &&
    err.name === "PrismaClientValidationError"
  ) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "The request data could not be stored as provided.",
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
