import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { VacationSchema } from "../schemas/vacation.schemas.js";

import {
    createVacation,
    getVacations,
    getVacation,
    updateVacation,
    deleteVacation,
} from "../controllers/vacation.controllers.js";

const router = new Router();
router.post("/vacation", validateSchema(VacationSchema), authRequired, adminRequired, createVacation);
router.get("/vacation", authRequired, getVacations);
router.get("/vacation/:id", authRequired, getVacation);
router.put("/vacation/:id", authRequired, adminRequired, updateVacation);
router.delete("/vacation/:id", authRequired, adminRequired, deleteVacation);

export default router;