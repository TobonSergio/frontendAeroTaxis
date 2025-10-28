// src/services/authHelper.js
import userService from "./userService";
import clienteService from "./clienteService";

export const getCurrentUser = async () => {
  // Revisamos el flag para saber si es cliente o usuario interno
  const isCliente = localStorage.getItem("isCliente") === "true";

  if (isCliente) {
    // Llamamos al endpoint de clientes
    return await clienteService.getCurrentCliente();
  } else {
    // Llamamos al endpoint de usuarios internos
    return await userService.getCurrentUser();
  }
};
