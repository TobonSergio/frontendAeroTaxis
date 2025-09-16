// src/services/authService.js
import axiosInstance from "../api/axiosConfig";

const register = (data) => {
  return axiosInstance.post("/api/auth/register", data);
};

const verifyAccount = (token) => {
  return axiosInstance.get(`/api/auth/verify?token=${token}`);
};

const login = (credentials) => {
  return axiosInstance.post("/api/auth/login", credentials);
};

const getCurrentUser = () => {
  return axiosInstance.get("/api/auth/me");
};

const logout = () => {
  localStorage.removeItem("jwtToken");
};

export default {
  register,
  verifyAccount,
  login,
  getCurrentUser,
  logout,
};
