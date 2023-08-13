import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

import {
  createRole,
  getRoles,
  getRole,
  updateRole,
} from "../controllers/role.controllers.js";

const router = new Router();
router.post("/role",authRequired, createRole);
router.get("/role", authRequired, getRoles);
router.get("/role/:id", authRequired, getRole);
router.put("/role/:id", authRequired, updateRole);
export default router;
