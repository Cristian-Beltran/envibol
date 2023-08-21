import axios from "./axios";

export const createVisitRequest = (visit) => axios.post("/visit", visit);

export const getVisitsRequest = () => axios.get("/visit");

export const getVisitdRequest = (id) => axios.get("/visit/" + id);

export const updateVisitRequest = (id, card) => axios.put("/visit/" + id, card);
