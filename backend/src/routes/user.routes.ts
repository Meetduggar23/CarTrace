import { Router } from "express";
import {
  clearHistory,
  deleteVehicle,
  listHistory,
  listVehicles,
  login,
  me,
  register,
  renameVehicle,
  saveVehicle,
} from "../controllers/user.controller";
import { authRequired } from "../middleware/auth";
import { authLimiter } from "../middleware/rate-limit";

const router = Router();

// Auth
router.post("/auth/register", authLimiter, register);
router.post("/auth/login", authLimiter, login);
router.get("/auth/me", authRequired, me);

// Saved vehicles
router.get("/user/vehicles", authRequired, listVehicles);
router.post("/user/vehicles", authRequired, saveVehicle);
router.patch("/user/vehicles/:id", authRequired, renameVehicle);
router.delete("/user/vehicles/:id", authRequired, deleteVehicle);

// Search history
router.get("/user/history", authRequired, listHistory);
router.delete("/user/history", authRequired, clearHistory);

export default router;
