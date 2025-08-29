import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const login = (username, password) =>
  api.post("/login", { username, password });

export const createUser = (user) =>
  api.post("/users", user);

export const getUsers = () =>
  api.get("/users");
