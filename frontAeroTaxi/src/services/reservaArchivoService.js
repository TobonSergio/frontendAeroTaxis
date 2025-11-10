import axiosInstance from "../api/axiosConfig";

const BASE_URL = "/api/reservas";

/**
 * 🔹 Descarga el PDF de una reserva
 * @param {number} idReserva
 */
const descargarPdf = async (idReserva) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/pdf/${idReserva}`, {
      responseType: "blob", // importante para manejar archivos binarios
    });

    // Crear enlace temporal para descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `reserva_${idReserva}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    console.log("✅ PDF descargado correctamente");
  } catch (error) {
    console.error("❌ Error al descargar el PDF:", error);
    throw error;
  }
};

/**
 * 🔹 Descarga el código QR de una reserva
 * @param {number} idReserva
 */
const descargarQr = async (idReserva) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/qr/${idReserva}`, {
      responseType: "blob",
    });

    // Crear enlace temporal para descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `qr_reserva_${idReserva}.png`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    console.log("✅ QR descargado correctamente");
  } catch (error) {
    console.error("❌ Error al descargar el QR:", error);
    throw error;
  }
};

export default {
  descargarPdf,
  descargarQr,
};
