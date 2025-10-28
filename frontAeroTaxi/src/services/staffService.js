// src/services/staffService.js
import axiosInstance from "../api/axiosConfig.js";

// 🔹 Obtener perfil actual (admin o staff)
const getProfile = async () => {
  const response = await axiosInstance.get("/api/staff/me");
  return response.data;
};

// 🔹 Actualizar perfil actual
const updateProfile = async (data) => {
  const response = await axiosInstance.put("/api/staff/me", data);
  return response.data;
};

export default { getProfile, updateProfile };
