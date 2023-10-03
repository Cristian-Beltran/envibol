import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";

import {
  getTotal,
  getEntrieHour,
  getEmployee,
  getExternal,
} from "../controllers/stats.controller.js";

const router = new Router();
router.get("/stats/total/:date", authRequired, getTotal);
router.get("/stats/entrieHour/:date", authRequired, getEntrieHour);
router.get("/stats/employee", authRequired, getEmployee);
router.get("/stats/external", authRequired, getExternal);
export default router;
