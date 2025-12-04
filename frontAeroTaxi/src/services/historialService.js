// src/services/historialService.js
import axiosInstance from "../api/axiosConfig.js";

const historialService = {
  getHistorialByCliente: async (idCliente) => {
    try {
      const response = await axiosInstance.get(`/api/historial/cliente/${idCliente}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener historial del cliente ${idCliente}:`, error);
      throw error;
    }
  },
};

export default historialService;
