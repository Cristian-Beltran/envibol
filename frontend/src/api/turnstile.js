import axios from "./axios";

export const createTurnstileRequest = (turnstile) => axios.post("/turnstile", turnstile);

export const getTurnstilesRequest = () => axios.get("/turnstile");

export const getTurnstileRequest = (id) => axios.get("/turnstile/" + id);

export const updateTurnstileRequest = (id, turnstile) =>
  axios.put("/turnstile/" + id, turnstile);
