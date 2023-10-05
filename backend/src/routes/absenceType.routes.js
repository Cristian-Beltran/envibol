import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { absenceTypeSchema } from "../schemas/absenceType.schemas.js";

import {
    createAbsenceType,
    getAbsenceTypes,
    getAbsenceType,
    updateAbsenceType,
    deleteAbsenceType,
} from "../controllers/absenceType.controllers.js";

const router = new Router();
router.post("/absenceType", validateSchema(absenceTypeSchema), authRequired, adminRequired, createAbsenceType);
router.get("/absenceType", authRequired, getAbsenceTypes);
router.get("/absenceType/:id", authRequired, getAbsenceType);
router.put("/absenceType/:id", authRequired, adminRequired, updateAbsenceType);
router.delete("/absenceType/:id", authRequired, adminRequired, deleteAbsenceType);

export default router;