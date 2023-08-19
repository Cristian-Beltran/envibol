import axios from "./axios";

export const createCardRequest = (card) => axios.post("/card", card);

export const getCardsRequest = () => axios.get("/card");

export const getCardsTypeRequest = (id, userId) =>
  axios.get("/card/typecards/" + id + "/" + userId);

export const getCardRequest = (id) => axios.get("/card/" + id);

export const deleteCardRequest = (id) => axios.delete("/card/" + id);

export const updateCardRequest = (id, card) => axios.put("/card/" + id, card);

export const connectCardRequest = (id, user) =>
  axios.put("/card/connect/" + id, user);

export const disconnectCardRequest = (id) =>
  axios.delete("/card/connect/" + id);

export const disconnectCardEmployeeRequest = (id) =>
  axios.delete("/card/connect/employee/" + id);

export const disconnectCardExternalRequest = (id) =>
  axios.delete("/card/connect/external/" + id);

export const getCardEmployeeRequest = (id) => axios.get("/card/employee/" + id);

export const getCardsExternalRequest = (userId) =>
  axios.get("/card/type/external/" + userId);

export const getCardsExternalRequestEmpty = () => axios.get("/card/type/external/");

export const getCardExternalRequest = (id) => axios.get("/card/external/" + id);
