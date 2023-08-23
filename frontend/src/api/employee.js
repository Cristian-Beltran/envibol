import axios from "./axios";

export const createEmployeeRequest = (employee) => axios.post("/employee", employee);

export const getEmployeesStaffRequest = () => axios.get("/employeeStaff");

export const getEmployeesAdminRequest = () => axios.get("/employeeAdmin");

export const getEmployeeRequest = (id) => axios.get("/employee/" + id);

export const deleteEmployeeRequest = (id) => axios.delete("/employee/" + id);

export const changeStatusEmployeeRequest = (id) =>
  axios.put("/employee/status/" + id);

export const updateEmployeedRequest = (id, card) =>
  axios.put("/employee/" + id, card);

