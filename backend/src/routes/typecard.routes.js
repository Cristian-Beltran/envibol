import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import {validateSchema} from "../middlewares/validator.middlewares.js";
import {typeCardSchema} from "../schemas/typecard.schemas.js";

import {
  createTypeCard,
  getTypeCards,
  getTypeCard,
  updateTypeCard,
  deleteTypeCard,
} from "../controllers/typecard.controllers.js";

const router = new Router();
router.post("/typecard", validateSchema(typeCardSchema), authRequired,adminRequired, createTypeCard);
router.get("/typecard", authRequired, getTypeCards);
router.get("/typecard/:id", authRequired, getTypeCard);
router.put("/typecard/:id", authRequired,adminRequired, updateTypeCard);
router.delete("/typecard/:id", authRequired,adminRequired, deleteTypeCard);
export default router;
