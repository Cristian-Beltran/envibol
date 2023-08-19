import axios from "./axios";

export const getTotalRequest = () => axios.get("/stats/total");
export const getEntrieHourRequest = () => axios.get("/stats/entrieHour");
export const getEmployeeRequest = () => axios.get("/stats/employee");
export const getExternalRequest = () => axios.get("/stats/external");



