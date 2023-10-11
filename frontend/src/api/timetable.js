import axios from "./axios";

export const createTimeTable = (timeTable) =>
  axios.post("/timeTable", timeTable);

export const getTimeTables = () => axios.get("/timeTable");

export const getTimeTableById = (id) => axios.get("/timeTable/");

export const updateTimeTable = (id, timeTable) =>
  axios.put("/timeTable/" + id, timeTable);
