import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/validateAdmin.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { timeTableSchema } from "../schemas/timeTable.schemas.js";

import {
    createTimeTable,
    getTimeTables,
    getTimeTableById,
    updateTimeTable,
} from "../controllers/timeTable.controllers.js";

const router = new Router();
router.post("/timeTable", validateSchema(timeTableSchema), authRequired, adminRequired, createTimeTable);
router.get("/timeTable", authRequired, adminRequired, getTimeTables);
router.get("/timeTable/:id", authRequired, adminRequired, getTimeTableById);
router.put("/timeTable/:id", authRequired, adminRequired, updateTimeTable);
export default router;