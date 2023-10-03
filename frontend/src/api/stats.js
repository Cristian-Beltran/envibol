import axios from "./axios";

export const getTotalRequest = (date) => axios.get("/stats/total/" + date);
export const getEntrieHourRequest = (date) =>
  axios.get("/stats/entrieHour/" + date);
export const getEmployeeRequest = () => axios.get("/stats/employee/");
export const getExternalRequest = () => axios.get("/stats/external");
