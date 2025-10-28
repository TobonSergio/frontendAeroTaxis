// src/services/choferService.js
import axios from "../api/axiosConfig.js";

const choferService = {
  // ✅ Obtener perfil del chofer
  getProfile: async () => {
    try {
      const response = await axios.get("/api/chofer/me");
      return response.data;
    } catch (error) {
      console.error("Error al obtener perfil del chofer:", error);
      throw error;
    }
  },

  // ✅ Actualizar perfil del chofer
  updateProfile: async (data) => {
    try {
      const response = await axios.put("/api/chofer/me", data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar perfil del chofer:", error);
      throw error;
    }
  }
};

export default choferService;
