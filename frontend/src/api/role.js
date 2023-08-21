import axios from "./axios";

export const createRoleRequest = (role) => axios.post("/role", role);

export const getRolesRequest = () => axios.get("/role");

export const getRoleRequest = (id) => axios.get("/role/" + id);

export const updateRoleRequest = (id, role) => axios.put("/role/" + id, role);
