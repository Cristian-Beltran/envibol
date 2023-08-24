import axios from "./axios";

export const getExitsRequest = (init, final) =>
  axios.get("/exits/" + init + "/" + final);

export const getEntriesRequest = (init, final) =>
  axios.get("/entries/" + init + "/" + final);

export const getEntrieRequest = (id) => axios.get("/entrie/" + id);

export const getEntriesUserRequest = (userId) =>
  axios.get("/entrie/user/" + userId);

export const getEntriesExitsRequest = (init, final) =>
  axios.get("/entriesexits/" + init + "/" + final);

