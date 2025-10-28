import axiosInstance from "../api/axiosConfig.js";

const reservaServiceCliente = {
  getAllByCliente: async (clienteId) => {
    try {
      const response = await axiosInstance.get(`/api/reservas/cliente/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener reservas del cliente:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/reservas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener reserva con ID ${id}:`, error);
      throw error;
    }
  },

  create: async (reservaData) => {
    try {
      const response = await axiosInstance.post("/api/reservas", reservaData);
      return response.data;
    } catch (error) {
      console.error("Error al crear reserva:", error);
      throw error;
    }
  },

  update: async (id, reservaData) => {
    try {
      const response = await axiosInstance.put(`/api/reservas/${id}`, reservaData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar reserva con ID ${id}:`, error);
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/reservas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar reserva con ID ${id}:`, error);
      throw error;
    }
  },
};

export default reservaServiceCliente;
