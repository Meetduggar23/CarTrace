import rateLimit from "express-rate-limit";
import { config, isTest } from "../config/env";

const skipInTest = () => isTest;

export const generalLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInTest,
  message: {
    error: {
      code: "RATE_LIMITED",
      message: "Too many requests. Please wait a moment before trying again.",
    },
  },
});

/** Stricter limiter for auth endpoints. */
export const authLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.authRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInTest,
  message: {
    error: {
      code: "RATE_LIMITED",
      message: "Too many attempts. Please wait a moment before trying again.",
    },
  },
});

/** Stricter limiter for vehicle search endpoints. */
export const searchLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: Math.max(config.rateLimitMax, 30),
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipInTest,
  message: {
    error: {
      code: "RATE_LIMITED",
      message: "Too many requests. Please wait a moment before trying again.",
    },
  },
});
