import { Router } from "express";
import { getProviders } from "../controllers/providers.controller";

const router = Router();

router.get("/", getProviders);

export default router;
