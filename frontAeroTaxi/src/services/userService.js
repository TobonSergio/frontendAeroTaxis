import axios from "../api/axiosConfig.js";

const userService = {
  // Obtener usuario actual
  getCurrentUser: async () => {
    try {
      const response = await axios.get("/api/auth/me"); // ✅ URL corregida
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  },

  // Actualizar datos del usuario
  updateUser: async (userData) => {
    try {
      const response = await axios.put("/api/auth/me", userData); // ✅ URL corregida
      return response.data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  },
};

export default userService;
