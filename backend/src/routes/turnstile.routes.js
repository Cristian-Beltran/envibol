import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

import {
  createTurnstile,
  getTurnstile,
  getTurnstiles,
  updateTurnstile,
} from "../controllers/turnstile.controllers.js";

const router = new Router();
router.post("/turnstile", authRequired, createTurnstile);
router.get("/turnstile", getTurnstiles);
router.get("/turnstile/:id", authRequired, getTurnstile);
router.put("/turnstile/:id", authRequired, updateTurnstile);
export default router;
