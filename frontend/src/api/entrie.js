import axios from "./axios";

export const getExitsRequest = (init, final) =>
  axios.get("/exits/" + init + "/" + final);

export const getEntriesRequest = (init, final) =>
  axios.get("/entries/" + init + "/" + final);

export const getEntriesTodayRequest = () => axios.get("/entrie/today")

export const getExitsTodayRequest = () => axios.get("/exit/today")


export const getEntrieRequest = (id) => axios.get("/entrie/" + id);

export const getEntriesUserRequest = (userId) => axios.get("/entrie/user/" + userId);
