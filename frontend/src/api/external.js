import axios from "./axios";

export const createExternalRequest = (extern) => axios.post("/external", extern);

export const getExternalsRequest = () => axios.get("/external");

export const getExternalRequest = (id) => axios.get("/external/" + id);

export const getExternalCiRequest = (ci) => axios.get("/external/ci/" + ci);

export const updateExternalRequest = (id, extern) =>
  axios.put("/external/" + id, extern);
