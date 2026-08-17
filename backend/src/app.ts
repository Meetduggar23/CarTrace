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

  // Security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // CORS — only allow configured origins
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || config.corsOrigins.length === 0) {
          callback(null, true);
          return;
        }
        if (config.corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new Error("Origin not allowed by CORS"));
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
