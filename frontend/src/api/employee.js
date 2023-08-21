import axios from "./axios";

export const createEmployeeRequest = (card) => axios.post("/employee", card);

export const getEmployeesRequest = () => axios.get("/employee");

export const getEmployeeRequest = (id) => axios.get("/employee/" + id);

export const deleteEmployeeRequest = (id) => axios.delete("/employee/" + id);

export const changeStatusEmployeeRequest = (id) =>
  axios.put("/employee/status/" + id);

export const updateEmployeedRequest = (id, card) =>
  axios.put("/employee/" + id, card);

