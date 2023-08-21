import { Router } from "express";
import {
  login,
  logout,
  profile,
  updateProfile,
  verifyToken,
  updatePassword,
} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { loginSchema } from "../schemas/auth.schemas.js";

const router = new Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", authRequired, logout);
router.put("/update/password", authRequired, updatePassword);
router.get("/profile", authRequired, profile);
router.put("/profile", authRequired, updateProfile);
router.get("/verify", verifyToken);

export default router;
