// src/services/adminStaffService.js
import axiosInstance from "../api/axiosConfig.js";

const adminUserService = {
  // Listar todos los staff/admin
  getAllStaff: async () => {
    try {
      const response = await axiosInstance.get("/api/admin/staff");
      return response.data;
    } catch (error) {
      console.error("Error al obtener staff:", error);
      throw error;
    }
  },

  // Obtener staff/admin por ID
  getStaffById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/admin/staff/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener staff con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear nuevo staff/admin
  createStaff: async (staffData) => {
    try {
      const response = await axiosInstance.post("/api/admin/staff", staffData);
      return response.data;
    } catch (error) {
      console.error("Error al crear staff:", error);
      throw error;
    }
  },

  // Actualizar staff/admin
  updateStaff: async (id, staffData) => {
    try {
      const response = await axiosInstance.put(`/api/admin/staff/${id}`, staffData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar staff con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar staff/admin
  deleteStaff: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/admin/staff/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar staff con ID ${id}:`, error);
      throw error;
    }
  },
};

export default adminUserService;
