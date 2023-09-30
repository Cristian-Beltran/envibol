import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { entrieSchema } from "../schemas/entrie.schemas.js";

import {
  createEntrie,
  getEntries,
  getExits,
  getEntrie,
  getUserEntrie,
  getEntriesExits,
} from "../controllers/entrie.controllers.js";

const router = new Router();
router.post("/entrie", validateSchema(entrieSchema), authRequired, createEntrie);
router.get("/entries/:init/:final", authRequired, getEntries);
router.get("/exits/:init/:final", authRequired, getExits);

router.get("/entriesexits/:init/:final", authRequired, getEntriesExits);

router.get("/entrie/:id", authRequired, getEntrie);
router.get("/entrie/user/:userId", authRequired, getUserEntrie);
export default router;
