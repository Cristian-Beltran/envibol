import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

import {
  createCard,
  getCards,
  getCard,
  updateCard,
  connectCard,
  disconnectCard,
} from "../controllers/card.controllers.js";

const router = new Router();
router.post("/card", authRequired, createCard);
router.get("/card", authRequired, getCards);
router.get("/card/:id", authRequired, getCard);
router.put("/card/:id", authRequired, updateCard);
router.put("/card/connect/:id", authRequired, connectCard);
router.delete("/card/connect/:id", authRequired, disconnectCard);
export default router;
