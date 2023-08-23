import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";

import {
  createRole,
  getRoles,
  getRole,
  updateRole,
} from "../controllers/role.controllers.js";

const router = new Router();
router.post("/role", authRequired, adminRequired, createRole);
router.get("/role", authRequired, getRoles);
router.get("/role/:id", authRequired, getRole);
router.put("/role/:id", authRequired, adminRequired, updateRole);
export default router;
