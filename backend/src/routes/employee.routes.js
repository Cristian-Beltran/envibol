import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  updateStatusEmployee,
} from "../controllers/employee.controllers.js";

const router = new Router();
router.post("/employee",createEmployee);
router.get("/employee", authRequired, getEmployees);
router.get("/employee/:id", authRequired, getEmployee);
router.put("/employee/:id", authRequired, updateEmployee);
router.delete("/employee/:id", authRequired, deleteEmployee);
router.post("/employee/status/:id", authRequired, updateStatusEmployee);
export default router;
