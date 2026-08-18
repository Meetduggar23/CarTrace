import { createApp } from "./app";
import { config } from "./config/env";
import { checkDatabaseHealth } from "./db/prisma";
import { providerManager } from "./providers/provider-manager";
import { logger } from "./utils/logger";

async function bootstrap() {
  const db = await checkDatabaseHealth();
  if (!db.configured) {
    logger.info(
      "[boot] DATABASE_URL not set — running without persistence (auth/saved-vehicles/history disabled)."
    );
  }

  const providers = providerManager.getEnabledProviders();
  logger.info(
    `[boot] enabled providers: ${providers.map((p) => p.name).join(", ") || "(none)"}`
  );

  const app = createApp();
  const server = app.listen(config.port, () => {
    logger.info(`[boot] CarTrace API listening on http://localhost:${config.port}`);
  });

  const shutdown = (signal: string) => {
    logger.info(`[boot] received ${signal}, shutting down...`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 5000).unref();
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

bootstrap().catch((err) => {
  logger.error("[boot] fatal error", { error: String(err) });
  process.exit(1);
});
