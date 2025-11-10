// src/services/reservaService.js
import axiosInstance from "../api/axiosConfig.js";

  const reservaService = {
    // ✅ Listar todas las reservas
    getAll: async () => {
      try {
        const response = await axiosInstance.get("/api/gestion/reservas");
        return response.data;
      } catch (error) {
        console.error("❌ Error al obtener las reservas:", error);
        throw error;
      }
    },

    getAllForDashboard: async () => {
        try {
            const response = await axiosInstance.get("/api/gestion/reservas/dashboard");
            return response.data;
        } catch (error) {
            console.error("❌ Error al obtener las reservas del dashboard:", error);
            throw error; // ❗ Importante: relanza el error para que el frontend lo capture correctamente
        }
    },
  // ✅ Obtener reserva por ID
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/gestion/reservas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error al obtener la reserva con ID ${id}:`, error);
      throw error;
    }
  },

  // ✅ Crear nueva reserva (si lo necesitas desde el front)
  create: async (reservaData) => {
    try {
      const response = await axiosInstance.post("/api/gestion/reservas", reservaData);
      return response.data;
    } catch (error) {
      console.error("❌ Error al crear reserva:", error);
      throw error;
    }
  },

  // ✅ Actualizar una reserva (por ejemplo, cambiar estado o asignar staff)
  update: async (id, reservaData) => {
    try {
      const response = await axiosInstance.put(`/api/gestion/reservas/${id}`, reservaData);
      return response.data;
    } catch (error) {
      console.error(`❌ Error al actualizar la reserva con ID ${id}:`, error);
      throw error;
    }
  },

  

  // ✅ Eliminar reserva
  remove: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/gestion/reservas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error al eliminar la reserva con ID ${id}:`, error);
      throw error;
    }
  },

  // ✅ Listar reservas pendientes
  getPendientes: async () => {
    try {
      const response = await axiosInstance.get("/api/gestion/reservas/pendientes");
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener las reservas pendientes:", error);
      throw error;
    }
  },
};

export default reservaService;
