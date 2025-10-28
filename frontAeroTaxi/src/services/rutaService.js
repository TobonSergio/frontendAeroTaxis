import axiosInstance from "../api/axiosConfig.js";

const rutaService = {
  // ✅ Obtener todas las rutas
  getAll: async () => {
    try {
      const response = await axiosInstance.get("/api/gestion/rutas");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las rutas:", error);
      throw error;
    }
  },

  // ✅ Obtener ruta por ID
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/gestion/rutas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la ruta con ID ${id}:`, error);
      throw error;
    }
  },

  // ✅ Crear nueva ruta
  create: async (rutaData) => {
    try {
      const response = await axiosInstance.post("/api/gestion/rutas", rutaData);
      return response.data;
    } catch (error) {
      console.error("Error al crear ruta:", error);
      throw error;
    }
  },

  // ✅ Actualizar ruta existente
  update: async (id, rutaData) => {
    try {
      const response = await axiosInstance.put(`/api/gestion/rutas/${id}`, rutaData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la ruta con ID ${id}:`, error);
      throw error;
    }
  },

  // ✅ Eliminar ruta
  remove: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/gestion/rutas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la ruta con ID ${id}:`, error);
      throw error;
    }
  },
};

export default rutaService;
