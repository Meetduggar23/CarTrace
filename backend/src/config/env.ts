import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Load environment from the repo root .env (or backend/.env) regardless of cwd.
const candidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "backend/.env"),
];
dotenv.config({ path: candidates, quiet: true });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGINS: z.string().default("http://localhost:5173"),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  VEHICLE_CACHE_TTL: z.coerce.number().int().positive().default(3600),
  MOCK_VEHICLE_PROVIDER: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),
  NHTSA_API_BASE_URL: z
    .string()
    .default("https://vpic.nhtsa.dot.gov/api/vehicles"),
  CARAPI_API_KEY: z.string().optional(),
  CARAPI_API_BASE_URL: z.string().default("https://api.carapi.app"),
  JWT_SECRET: z.string().default("dev-only-secret-change-me"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(60),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(10),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error(
    "Invalid environment configuration:",
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

const env = parsed.data;

if (env.NODE_ENV === "production") {
  if (env.JWT_SECRET === "dev-only-secret-change-me") {
    // eslint-disable-next-line no-console
    console.warn(
      "[config] WARNING: JWT_SECRET is using the insecure development default in production."
    );
  }
  if (env.MOCK_VEHICLE_PROVIDER) {
    // eslint-disable-next-line no-console
    console.warn(
      "[config] MOCK_VEHICLE_PROVIDER is enabled but ignored in production (mock data is development-only)."
    );
  }
}

export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

/**
 * Whether the mock provider may serve data. Mock data is strictly
 * development-only and is never available in production.
 */
export const mockProviderEnabled =
  env.MOCK_VEHICLE_PROVIDER && !isProduction;

export const config = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  corsOrigins: env.CORS_ORIGINS.split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  databaseUrl: env.DATABASE_URL,
  redisUrl: env.REDIS_URL,
  vehicleCacheTtlSeconds: env.VEHICLE_CACHE_TTL,
  mockProviderEnabled,
  nhtsaApiBaseUrl: env.NHTSA_API_BASE_URL.replace(/\/+$/, ""),
  carApiKey: env.CARAPI_API_KEY,
  carApiBaseUrl: env.CARAPI_API_BASE_URL.replace(/\/+$/, ""),
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  rateLimitWindowMs: env.RATE_LIMIT_WINDOW_MS,
  rateLimitMax: env.RATE_LIMIT_MAX,
  authRateLimitMax: env.AUTH_RATE_LIMIT_MAX,
} as const;

export default config;
