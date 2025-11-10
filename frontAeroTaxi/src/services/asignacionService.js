// src/services/asignacionService.js
import axiosInstance from "../api/axiosConfig.js";

const BASE_URL = "/api/gestion/asignaciones";

// 🔹 Crear una nueva asignación (unidad + chofer)
const crearAsignacion = async (data) => {
  const response = await axiosInstance.post(BASE_URL, data);
  return response.data;
};

// 🔹 Listar todas las asignaciones
const listarAsignaciones = async () => {
  const response = await axiosInstance.get(BASE_URL);
  return response.data;
};

// 🔹 Obtener una asignación por ID
const obtenerAsignacion = async (id) => {
  const response = await axiosInstance.get(`${BASE_URL}/${id}`);
  return response.data;
};

// 🔹 Actualizar estado de la asignación
const actualizarEstado = async (id, estado) => {
  const response = await axiosInstance.put(`${BASE_URL}/${id}/estado`, null, {
    params: { estado },
  });
  return response.data;
};

// 🔹 Eliminar asignación
const eliminarAsignacion = async (id) => {
  await axiosInstance.delete(`${BASE_URL}/${id}`);
};

// 🔹 Descargar PDF de la asignación
const descargarPdf = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/pdf/${id}`, {
      responseType: "blob", // importante para archivos binarios
    });

    // Crear un objeto URL temporal
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Crear enlace temporal para descarga
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `asignacion_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("❌ Error al descargar PDF:", error);
    throw error;
  }
};

const listarReservasPendientes = async () => {
  try {
    const response = await axiosInstance.get("/api/gestion/reservas/pendientes");
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener reservas pendientes:", error);
    throw error;
  }
};

// 🔹 Listar choferes disponibles
const listarChoferesDisponibles = async () => {
  try {
    const response = await axiosInstance.get("/api/gestion/choferes/disponibles");
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener choferes disponibles:", error);
    throw error;
  }
};

// 🔹 Listar unidades disponibles
const listarUnidadesDisponibles = async () => {
  try {
    const response = await axiosInstance.get("/api/gestion/unidades/disponibles");
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener unidades disponibles:", error);
    throw error;
  }
};


export default {
  crearAsignacion,
  listarAsignaciones,
  obtenerAsignacion,
  actualizarEstado,
  eliminarAsignacion,
  descargarPdf, // 🔹 agregado
  listarReservasPendientes,
  listarChoferesDisponibles,
  listarUnidadesDisponibles,
};
