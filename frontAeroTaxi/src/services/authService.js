import axiosInstance from "../api/axiosConfig";

const login = (credentials) => {
  // credentials = { username, password }
  return axiosInstance.post("/api/auth/login", credentials);
};

const getCurrentUser = () => {
  return axiosInstance.get("/api/auth/me");
};

const verifyAccount = (token) => {
  return axiosInstance.get(`/api/auth/verify?token=${token}`);
};

// 🔹 Nuevo: Google Login
const googleLogin = () => {
  // Redirige al endpoint backend que inicia OAuth con Google
  window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
};

export default {
  login,
  getCurrentUser,
  verifyAccount,
  googleLogin, // 🔹 exportamos la función de Google
};
