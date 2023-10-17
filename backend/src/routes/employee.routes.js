import {Router} from "express";

import {authRequired} from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validator.middlewares.js";
import {employeeSchema} from "../schemas/employee.schemas.js";

import {
  createEmployee,
  getEmployeesAdmin,
  getEmployeesStaff,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  updateStatusEmployee,
  getEmployeeTimes,
  getEmployeeTimeTable,
  updateEmployeeTimeTable
} from "../controllers/employee.controllers.js";
import {adminRequired} from "../middlewares/validateAdmin.js";

const router = new Router();
router.post("/employee", validateSchema(employeeSchema), authRequired, createEmployee);
router.get("/employeeAdmin", authRequired, adminRequired, getEmployeesAdmin);
router.get("/employeeStaff", authRequired, getEmployeesStaff);
router.get("/employee/:id", authRequired, getEmployee);
router.put("/employee/:id", authRequired, updateEmployee);
router.delete("/employee/:id", authRequired, deleteEmployee);
router.put("/employee/status/:id", authRequired, updateStatusEmployee);

//rutas para el horario
router.get("/employee-time", authRequired, getEmployeeTimes);
router.get("/employee/time/:id", authRequired, getEmployeeTimeTable);
router.put("/employee/time/:id", authRequired, updateEmployeeTimeTable);

export default router;
