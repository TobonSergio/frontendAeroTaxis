import axios from "../api/axiosConfig.js";

const choferService = {
  // 🔹 Obtener todos los choferes
  getAll: async () => {
    const response = await axios.get("/api/gestion/choferes");
    return response.data;
  },

  // 🔹 Crear nuevo chofer
  create: async (data) => {
    const response = await axios.post("/api/gestion/choferes", data);
    return response.data;
  },

  // 🔹 Actualizar chofer
  update: async (id, data) => {
    const response = await axios.put(`/api/gestion/choferes/${id}`, data);
    return response.data;
  },

  // 🔹 Eliminar chofer
  remove: async (id) => {
    await axios.delete(`/api/gestion/choferes/${id}`);
  },

  // 🔹 Listar choferes disponibles (opcional)
  getDisponibles: async () => {
    const response = await axios.get("/api/gestion/choferes/disponibles");
    return response.data;
  },
};

export default choferService;
