import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

import {
  createEmployee,
  getEmployeesAdmin,
  getEmployeesStaff,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  updateStatusEmployee,
} from "../controllers/employee.controllers.js";
import { adminRequired } from "../middlewares/validateAdmin.js";

const router = new Router();
router.post("/employee", authRequired, createEmployee);
router.get("/employeeAdmin", authRequired, adminRequired, getEmployeesAdmin);
router.get("/employeeStaff", authRequired, getEmployeesStaff);
router.get("/employee/:id", authRequired, getEmployee);
router.put("/employee/:id", authRequired, updateEmployee);
router.delete("/employee/:id", authRequired, deleteEmployee);
router.put("/employee/status/:id", authRequired, updateStatusEmployee);
export default router;
