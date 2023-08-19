import axios from "./axios";

export const createTypeCardRequest = (card) => axios.post("/typecard", card);

export const getTypeCardsRequest = () => axios.get("/typecard");

export const getTypeCardRequest = (id) => axios.get("/typecard/" + id);

export const deleteTypeCardRequest = (id) => axios.delete("/typecard/" + id);

export const updateTypeCardRequest = (id, card) =>
  axios.put("/typecard/" + id, card);
