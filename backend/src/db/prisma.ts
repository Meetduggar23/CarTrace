import { config } from "../config/env";
import { PrismaClient } from "../generated/prisma";
import { logger } from "../utils/logger";

let client: PrismaClient | null = null;
let healthy = false;

/**
 * Returns the Prisma client, or null when no DATABASE_URL is configured.
 * The app degrades gracefully: auth/saved-vehicles/history endpoints
 * return DATABASE_REQUIRED responses instead of crashing.
 */
export function getPrisma(): PrismaClient | null {
  if (!config.databaseUrl) return null;
  if (client) return client;

  client = new PrismaClient({
    datasources: { db: { url: config.databaseUrl } },
  });
  return client;
}

/** Whether the database is configured and reachable. */
export function isDatabaseAvailable(): boolean {
  return Boolean(config.databaseUrl);
}

/** Verify connectivity at startup (non-fatal when unreachable). */
export async function checkDatabaseHealth(): Promise<{
  configured: boolean;
  connected: boolean;
}> {
  if (!isDatabaseAvailable()) {
    return { configured: false, connected: false };
  }
  try {
    const prisma = getPrisma()!;
    await prisma.$queryRaw`SELECT 1`;
    if (!healthy) {
      healthy = true;
      logger.info("[db] database connection verified");
    }
    return { configured: true, connected: true };
  } catch (err) {
    healthy = false;
    logger.warn("[db] database unreachable — running without persistence", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { configured: true, connected: false };
  }
}

/** For tests: drop the cached client. */
export function resetPrismaForTest(): void {
  client = null;
  healthy = false;
}
