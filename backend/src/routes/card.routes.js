import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

import {
  createCard,
  getCards,
  getCardsType,
  getCardEmployee,
  getCardExternal,
  getCardsExternal,
  getCardsExternalEmpty,
  disconnectExternalCard,
  getCard,
  updateCard,
  connectCard,
  disconnectCard,
  disconnectEmployeeCard,
  deleteCard,
} from "../controllers/card.controllers.js";

const router = new Router();
router.post("/card", authRequired, createCard);
router.get("/card", authRequired, getCards);
router.get("/card/:id", authRequired, getCard);
router.get("/card/employee/:id", authRequired, getCardEmployee);
router.get("/card/external/:id", authRequired, getCardExternal);
router.get("/card/typecards/:id/:userId", authRequired, getCardsType);
router.get("/card/type/external/:userId", authRequired, getCardsExternal);
router.get("/card/type/external/", authRequired, getCardsExternalEmpty);
router.put("/card/:id", authRequired, updateCard);
router.put("/card/connect/:id", authRequired, connectCard);
router.put("/card/connect/:id", authRequired, connectCard);
router.delete("/card/connect/:id", authRequired, disconnectCard);

router.delete(
  "/card/connect/employee/:id",
  authRequired,
  disconnectEmployeeCard
);

router.delete(
  "/card/connect/external/:id",
  authRequired,
  disconnectExternalCard
);

router.delete("/card/:id", authRequired, deleteCard);
export default router;
