import axiosInstance from "../api/axiosConfig";

const login = (credentials) => {
  return axiosInstance.post("/api/auth/login", credentials);
};

const getCurrentUser = () => {
  return axiosInstance.get("/api/auth/me");
};

const verifyAccount = (token) => {
  return axiosInstance.get(`/api/auth/verify?token=${token}`);
};

const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
};

// 🔥 ESTA ES LA QUE FALTABA 🔥
const register = (data) => {
  return axiosInstance.post("/api/auth/register", data);
};

export default {
  login,
  getCurrentUser,
  verifyAccount,
  googleLogin,
  register, // ⬅️ Exportar
};
