import axios from "./axios";

export const createTimeTableRequest = (timeTable) => axios.post("/timeTable", timeTable);

export const getTimeTableRequest = (id) => axios.get("/timeTable/" + id);

export const getTimeTablesRequest = () => axios.get("/timeTable/");

export const updateTimeTableRequest = (id, timeTable) =>
  axios.put("/timeTable/" + id, timeTable);
