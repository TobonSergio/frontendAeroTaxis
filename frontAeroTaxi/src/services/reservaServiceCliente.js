// src/services/reservaServiceCliente.js
import axiosInstance from "../api/axiosConfig.js";

const reservaServiceCliente = {
  // ✅ Crear reserva
  create: async (reservaData) => {
    try {
      const response = await axiosInstance.post("/api/reservas", reservaData);
      console.log("📦 Response de reservaServiceCliente:", response);
      return response.data;
    } catch (error) {
      console.error("❌ Error al crear reserva:", error);
      throw error;
    }
  },

  // ✅ Descargar PDF de una reserva
  downloadPDF: async (idReserva) => {
    try {
      console.log(`📄 Descargando PDF de reserva ID: ${idReserva}`);
      const response = await axiosInstance.get(`/api/reservas/pdf/${idReserva}`, {
        responseType: "blob", // importante para manejar archivos binarios
      });

      // Crear un objeto URL temporal
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Crear enlace temporal para descarga
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `reserva_${idReserva}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("✅ PDF descargado correctamente");
    } catch (error) {
      console.error("❌ Error al descargar PDF:", error);
      throw error;
    }
  },

  // ✅ Descargar QR de una reserva
  downloadQR: async (idReserva) => {
    try {
      console.log(`📸 Descargando QR de reserva ID: ${idReserva}`);
      const response = await axiosInstance.get(`/api/reservas/qr/${idReserva}`, {
        responseType: "blob",
      });

      // Crear objeto URL para mostrar o descargar
      const blob = new Blob([response.data], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);

      // Crear enlace temporal para descarga
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `reserva_${idReserva}_qr.png`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("✅ QR descargado correctamente");
    } catch (error) {
      console.error("❌ Error al descargar QR:", error);
      throw error;
    }
  },
};

export default reservaServiceCliente;
