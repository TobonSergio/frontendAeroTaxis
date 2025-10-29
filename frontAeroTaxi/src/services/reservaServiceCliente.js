import axiosInstance from "../api/axiosConfig.js";

const reservaServiceCliente = {
  create: async (reservaData) => {
    try {
      const response = await axiosInstance.post("/api/reservas", reservaData);
      console.log("aqui se muestra nuestro response de reservaServiceCliente");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error al crear reserva:", error);
      throw error;
    }
  },
};

export default reservaServiceCliente;
