import api from "./api";

export const loginUser = async (userData) => {
  const res = await api.post("/users/login", userData);
  return res.data;
};
