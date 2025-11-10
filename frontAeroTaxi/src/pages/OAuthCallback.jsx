// src/pages/OAuthCallback.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import authService from "../services/authService";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // 🔹 Redirigir según el rol del usuario
  const redirectByRole = (rolId, rolName) => {
    console.log("🎯 Redirigiendo según rol:", rolId, rolName);

    if (rolName === "CLIENTE" || rolId === 3) {
      navigate("/dashboard/reserva-cliente");
    }else if (rolName === "CHOFER" || rolId === 4) {
      navigate("/dashboard/chofer/perfil");
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      console.log("🔑 Token recibido desde Google:", token);
      localStorage.setItem("token", token);

      // 🔹 Obtener datos del usuario autenticado desde el backend
      authService
        .getCurrentUser() // ✅ se reemplaza getUserData() por getCurrentUser()
        .then((response) => {
          const userData = response.data;
          console.log("✅ Datos del usuario Google:", userData);

          // 🔹 Guardar usuario en contexto global
          login(userData);

          // 🔹 Redirigir según el rol
          redirectByRole(userData?.rolId, userData?.rolName);
        })
        .catch((err) => {
          console.error("❌ Error obteniendo usuario con Google:", err);
          navigate("/login");
        });
    } else {
      console.warn("⚠️ No se recibió token en la URL, redirigiendo a login");
      navigate("/login");
    }
  }, [location.search, navigate, login]);

  return <p>🔄 Iniciando sesión con Google...</p>;
};

export default OAuthCallback;
