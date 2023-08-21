import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

import {
  createTypeCard,
  getTypeCards,
  getTypeCard,
  updateTypeCard,
  deleteTypeCard,
} from "../controllers/typecard.controllers.js";

const router = new Router();
router.post("/typecard", authRequired, createTypeCard);
router.get("/typecard", authRequired, getTypeCards);
router.get("/typecard/:id", authRequired, getTypeCard);
router.put("/typecard/:id", authRequired, updateTypeCard);
router.delete("/typecard/:id", authRequired, deleteTypeCard);
export default router;
