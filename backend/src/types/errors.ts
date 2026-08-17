/**
 * Structured application errors. The error middleware maps these to
 * consistent JSON responses: { error: { code, message, details? } }.
 */
export class AppError extends Error {
  readonly statusCode: number;
  code: string;
  readonly details?: unknown;

  constructor(
    statusCode: number,
    code: string,
    message: string,
    details?: unknown
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(400, "VALIDATION_ERROR", message, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required") {
    super(401, "UNAUTHORIZED", message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action") {
    super(403, "FORBIDDEN", message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(404, "NOT_FOUND", message);
  }
}

export class VehicleNotFoundError extends NotFoundError {
  constructor(message = "We couldn't find a record for this query.") {
    super(message);
    this.code = "VEHICLE_NOT_FOUND";
  }
}

export class UnsupportedLookupError extends AppError {
  constructor(
    message = "This lookup type is currently unavailable with the configured provider."
  ) {
    super(422, "UNSUPPORTED_LOOKUP", message);
  }
}

export class ProviderUnavailableError extends AppError {
  constructor(
    message = "The selected vehicle data provider is currently unavailable. Please try again later."
  ) {
    super(503, "PROVIDER_UNAVAILABLE", message);
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Too many requests. Please wait a moment before trying again.") {
    super(429, "RATE_LIMITED", message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, "CONFLICT", message);
  }
}

/** Feature disabled because no database is configured. */
export class DatabaseRequiredError extends AppError {
  constructor(message = "This feature requires a database to be configured.") {
    super(503, "DATABASE_REQUIRED", message);
  }
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}
