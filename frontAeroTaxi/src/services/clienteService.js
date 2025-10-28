// src/services/clienteService.js
import axiosInstance from "../api/axiosConfig.js";

const clienteService = {
  // ✅ Obtener cliente actual
  getCurrentCliente: async () => {
    console.log("🔹 [clienteService] Iniciando petición GET /api/clientes/me");
    try {
      const response = await axiosInstance.get("/api/clientes/me");

      console.log("✅ [clienteService] Respuesta recibida de /api/clientes/me:");
      console.log("👉 Status:", response.status);
      console.log("👉 Data:", response.data);

      return response.data;
    } catch (error) {
      console.error("❌ [clienteService] Error al obtener cliente:");
      if (error.response) {
        console.error("📡 Status:", error.response.status);
        console.error("📦 Data:", error.response.data);
      } else {
        console.error("⚠️ Error sin respuesta:", error.message);
      }
      throw error;
    }
  },

  // ✅ Actualizar datos del cliente
  updateCliente: async (data) => {
    console.log("🔹 [clienteService] Iniciando petición PUT /api/clientes/me");
    console.log("📤 Datos enviados:", data);

    try {
      const response = await axiosInstance.put("/api/clientes/me", data);

      console.log("✅ [clienteService] Cliente actualizado correctamente:");
      console.log("👉 Status:", response.status);
      console.log("👉 Data:", response.data);

      return response.data;
    } catch (error) {
      console.error("❌ [clienteService] Error al actualizar cliente:");
      if (error.response) {
        console.error("📡 Status:", error.response.status);
        console.error("📦 Data:", error.response.data);
      } else {
        console.error("⚠️ Error sin respuesta:", error.message);
      }
      throw error;
    }
  },
};

export default clienteService;
