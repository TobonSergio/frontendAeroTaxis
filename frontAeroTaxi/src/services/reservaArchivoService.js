import axiosInstance from "../api/axiosConfig";

const BASE_PATH = "/api/reservas";

/**
 * 🔹 Descarga el PDF de una reserva
 */
const descargarPdf = async (idReserva) => {
  try {
    const response = await axiosInstance.get(`${BASE_PATH}/pdf/${idReserva}`, {
      responseType: "blob",
    });

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
 * 🔹 Descarga el QR de una reserva
 */
const descargarQr = async (idReserva) => {
  try {
    const response = await axiosInstance.get(`${BASE_PATH}/qr/${idReserva}`, {
      responseType: "blob",
    });

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
