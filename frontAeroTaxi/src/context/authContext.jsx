// src/context/authContext.jsx
import { createContext, useState, useEffect } from "react";
import authService from "../services/authService.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar usuario actual al iniciar la app si hay token
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getCurrentUser();
        const data = response.data;

        const idPerfil =
          data.idCliente || data.idStaff || data.idChofer || null;
        const tipoPerfil = data.idCliente
          ? "CLIENTE"
          : data.idStaff
          ? "STAFF"
          : data.idChofer
          ? "CHOFER"
          : "USER";

        const userFormatted = {
          id: data.id,
          correo: data.correo,
          rolid: data.rolId,
          rolnombre: data.rolName,
          idPerfil,
          tipoPerfil,
        };

        setUser(userFormatted);
      } catch (err) {
        console.error("Error cargando usuario:", err);
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // 🔹 Función de login (retorna usuario formateado)
  const login = async (responseData) => {
    const { token: newToken } = responseData;

    if (!newToken) throw new Error("Token no recibido desde el backend");

    // 💾 Guardamos token
    localStorage.setItem("token", newToken);
    setToken(newToken);

    try {
      const response = await authService.getCurrentUser();
      const data = response.data;

      const idPerfil =
        data.idCliente || data.idStaff || data.idChofer || null;
      const tipoPerfil = data.idCliente
        ? "CLIENTE"
        : data.idStaff
        ? "STAFF"
        : data.idChofer
        ? "CHOFER"
        : "USER";

      const userFormatted = {
        id: data.id,
        correo: data.correo,
        rolid: data.rolId,
        rolnombre: data.rolName,
        idPerfil,
        tipoPerfil,
      };

      setUser(userFormatted);

      // 🔥 IMPORTANTE: retornamos el usuario para usarlo en Login.jsx
      return userFormatted;
    } catch (err) {
      console.error("Error obteniendo usuario después del login:", err);
      setUser(null);
      localStorage.removeItem("token");
      throw err;
    }
  };

  // 🔹 Función de logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
