import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";

import {
  createTurnstile,
  getTurnstile,
  getTurnstiles,
  updateTurnstile,
} from "../controllers/turnstile.controllers.js";

const router = new Router();
router.post("/turnstile", authRequired, adminRequired, createTurnstile);
router.get("/turnstile", authRequired, adminRequired, getTurnstiles);
router.get("/turnstile/:id", authRequired, adminRequired, getTurnstile);
router.put("/turnstile/:id", authRequired, adminRequired, updateTurnstile);
export default router;
