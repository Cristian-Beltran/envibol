import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

import {
  getExternals,
  getExternal,
  updateExternal,
  getCiExternal,
  createExternal,
} from "../controllers/external.controllers.js";

const router = new Router();
router.post("/external", authRequired, createExternal);
router.get("/external", authRequired, getExternals);
router.get("/external/:id", authRequired, getExternal);
router.get("/external/ci/:ci", authRequired, getCiExternal);
router.put("/external/:id", authRequired, updateExternal);
export default router;
