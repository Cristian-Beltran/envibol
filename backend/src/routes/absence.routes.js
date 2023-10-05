import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { absenceSchema } from "../schemas/absence.schemas.js";

import {
    createAbsence,
    getAbsences,
    getAbsence,
    updateAbsence,
    deleteAbsence,
} from "../controllers/absence.controllers.js";

const router = new Router();
router.post("/absence", validateSchema(absenceSchema), authRequired, adminRequired, createAbsence);
router.get("/absence", authRequired, getAbsences);
router.get("/absence/:id", authRequired, getAbsence);
router.put("/absence/:id", authRequired, adminRequired, updateAbsence);
router.delete("/absence/:id", authRequired, adminRequired, deleteAbsence);

export default router;