import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

import {
  createVisit,
  getVisits,
  getVisit,
  getVisitToday,
  getExternalVisit,
  updateVisit,
} from "../controllers/visit.controllers.js";

const router = new Router();
router.post("/visit",authRequired, createVisit);
router.get("/visit", authRequired, getVisits);
router.get("/visit/today", authRequired, getVisitToday);
router.get("/visit/:id", authRequired, getVisit);
router.get("/visit/external/:externalId", authRequired, getExternalVisit);
router.put("/visit/:id", authRequired, updateVisit);
export default router;
