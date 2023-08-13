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
router.get("/entrie", authRequired, getEntries);
router.get("/exit", authRequired, getExits);
router.get("/entrie/today", authRequired, getEntriesToday);
router.get("/exit/today", authRequired, getExitsToday);
router.get("/entrie/:id", authRequired, getEntrie);
router.get("/entrie/user/:userId", authRequired, getUserEntrie);
export default router;
