import { Router } from "express";
import {
  decodeVin,
  decodeVinByPath,
  searchRegistration,
  searchRegistrationByPath,
} from "../controllers/vehicle.controller";
import { authOptional } from "../middleware/auth";
import { searchLimiter } from "../middleware/rate-limit";

const router = Router();

router.post("/search", searchLimiter, authOptional, searchRegistration);
router.post("/vin", searchLimiter, authOptional, decodeVin);
router.get("/vin/:vin", searchLimiter, authOptional, decodeVinByPath);
router.get("/:registration", searchLimiter, authOptional, searchRegistrationByPath);

export default router;
