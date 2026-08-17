import { Router } from "express";
import { checkDatabaseHealth } from "../db/prisma";
import { providerManager } from "../providers/provider-manager";
import providersRoutes from "./providers.routes";
import rtoRoutes from "./rto.routes";
import userRoutes from "./user.routes";
import vehicleRoutes from "./vehicle.routes";

const router = Router();

router.get("/health", async (_req, res) => {
  const db = await checkDatabaseHealth();
  const enabledProviders = providerManager.getEnabledProviders().map((p) => ({
    id: p.id,
    name: p.name,
    isMock: p.isMock,
  }));
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    database: db,
    providers: enabledProviders,
  });
});

router.use("/vehicle", vehicleRoutes);
router.use("/rto", rtoRoutes);
router.use("/providers", providersRoutes);
router.use(userRoutes);

export default router;
