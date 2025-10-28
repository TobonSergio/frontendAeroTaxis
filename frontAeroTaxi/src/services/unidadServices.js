import axiosInstance from "../api/axiosConfig.js";

const unidadService = {
  // ✅ Obtener todas las unidades
  getAll: async () => {
    try {
      const response = await axiosInstance.get("/api/gestion/unidades");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las unidades:", error);
      throw error;
    }
  },

  // ✅ Obtener unidad por ID
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/gestion/unidades/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la unidad con ID ${id}:`, error);
      throw error;
    }
  },

  // ✅ Obtener unidades disponibles
  getDisponibles: async () => {
    try {
      const response = await axiosInstance.get("/api/gestion/unidades/disponibles");
      return response.data;
    } catch (error) {
      console.error("Error al obtener unidades disponibles:", error);
      throw error;
    }
  },

  // ✅ Crear una nueva unidad
  create: async (unidadData) => {
    try {
      const response = await axiosInstance.post("/api/gestion/unidades", unidadData);
      return response.data;
    } catch (error) {
      console.error("Error al crear unidad:", error);
      throw error;
    }
  },

  // ✅ Actualizar unidad existente
  update: async (id, unidadData) => {
    try {
      const response = await axiosInstance.put(`/api/gestion/unidades/${id}`, unidadData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la unidad con ID ${id}:`, error);
      throw error;
    }
  },

  // ✅ Eliminar unidad
  remove: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/gestion/unidades/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la unidad con ID ${id}:`, error);
      throw error;
    }
  },
};

export default unidadService;
