import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";

import {
  createEntrie,
  getEntries,
  getExits,
  getEntrie,
  getUserEntrie,
  getEntriesToday,
  getExitsToday,
} from "../controllers/entrie.controllers.js";

const router = new Router();
router.post("/entrie", createEntrie);
router.get("/entries/:init/:final", authRequired, getEntries);
router.get("/exits/:init/:final", authRequired, getExits);

router.get("/entrie/today", authRequired, getEntriesToday);
router.get("/exit/today", authRequired, getExitsToday);
router.get("/entrie/:id", authRequired, getEntrie);
router.get("/entrie/user/:userId", authRequired, getUserEntrie);
export default router;
