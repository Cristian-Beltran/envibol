import { Router } from "express";
import {
  login,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { loginSchema } from "../schemas/auth.schemas.js";

const router = new Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.get("/verify", verifyToken);

export default router;
