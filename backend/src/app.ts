import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config, isTest } from "./config/env";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error-handler";
import { generalLimiter } from "./middleware/rate-limit";
import { requestLogger } from "./middleware/request-logger";
import apiRoutes from "./routes";

export function createApp() {
  const app = express();

  // When running behind a reverse proxy (TRUST_PROXY=true), trust the
  // X-Forwarded-For header so rate limiting and logging see the real client IP.
  if (config.trustProxy) {
    app.set("trust proxy", 1);
  }

  // Security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // CORS — only allow configured origins.
  app.use(
    cors({
      origin(origin, callback) {
        // Requests without an Origin header (curl, server-to-server) are fine.
        if (!origin) {
          callback(null, true);
          return;
        }
        if (config.corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        // Deny unknown browser origins. An empty allow-list must NOT silently
        // allow every origin; the browser will block the request.
        callback(null, false);
      },
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      maxAge: 86400,
    })
  );

  // Body parsing with a small limit
  app.use(express.json({ limit: "100kb" }));

  if (!isTest) {
    app.use(requestLogger);
    app.use(generalLimiter);
  }

  // Health + API routes
  app.use("/api", apiRoutes);

  // 404 + error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
