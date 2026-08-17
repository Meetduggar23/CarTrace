import { Router } from "express";
import { getRtoByCode, listRto } from "../controllers/rto.controller";
import { generalLimiter } from "../middleware/rate-limit";

const router = Router();

router.get("/", generalLimiter, listRto);
router.get("/:code", generalLimiter, getRtoByCode);

export default router;
