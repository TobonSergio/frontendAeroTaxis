import { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario actual si hay token
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getCurrentUser();
        const data = response.data;

        // 👇 Aseguramos que el rol quede claro
        const userFormatted = {
          id: data.id,
          username: data.usuario,
          correo: data.correo,
          rolid: data.rolId,
          rolnombre: data.rolName,
        };

        console.log("✅ Usuario autenticado:", userFormatted);
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

  // Login
  const login = async (tokenFromBackend) => {
    localStorage.setItem("token", tokenFromBackend);
    setToken(tokenFromBackend);

    try {
      const response = await authService.getCurrentUser();
      const data = response.data;

      const userFormatted = {
        id: data.id,
        correo: data.correo,
        username: data.usuario,
        rolid: data.rolId,
        rolnombre: data.rolName,
      };

      console.log("✅ Usuario después de login:", userFormatted);
      setUser(userFormatted);
    } catch (err) {
      console.error("Error obteniendo usuario después del login:", err);
      setUser(null);
      localStorage.removeItem("token");
      throw err;
    }
  };

  // Logout
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
