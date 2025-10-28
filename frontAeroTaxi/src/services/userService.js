// src/services/userService.js
import axios from "../api/axiosConfig.js";

const userService = {
  // ✅ Obtener usuario actual

  getCurrentUser: async () => {
    console.log("entro a getCurrentUser");
    try {
      const response = await axios.get("/api/auth/me");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  },

  // ✅ Actualizar usuario
  updateUser: async (userData) => {
    try {
      const response = await axios.put("/api/auth/me", userData);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  },

};

export default userService;
