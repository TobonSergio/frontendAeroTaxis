import "../styles/styleLogin.css";
import "../styles/styleNavbarLanding.css";
import NavbarLanding from "../components/NavbarLanding";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import authService from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Función para redirigir según rol
  const redirectByRole = (rolId, rolName) => {
    console.log("🎯 [redirectByRole] Recibido rolId:", rolId, "| rolName:", rolName);

    if (rolName === "CLIENTE" || rolId === 3) {
      console.log("➡️ Redirigiendo a /dashboard/inicio-cliente");
      navigate("/dashboard/inicio-cliente");
    } else if (rolName === "CHOFER" || rolId === 4) {
      console.log("➡️ Redirigiendo a /dashboard/chofer/perfil");
      navigate("/dashboard/chofer/perfil");
    } else {
      console.log("⚠️ Rol no reconocido, redirigiendo a /dashboard");
      navigate("/dashboard");
    }
  };

  // 🔹 Manejar token de Google si viene en la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      login({ token })
        .then((userData) => {
          console.log("✅ Usuario con Google:", userData);
          redirectByRole(userData?.rolid, userData?.rolnombre);
        })
        .catch(() => setError("No se pudo iniciar sesión con Google"));
    }
  }, [location.search]);

  // 🔹 Login normal con usuario/contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 Iniciando login...");
      const response = await authService.login({ username, password });
      const data = response.data;

      console.log("✅ [Login.jsx] Datos recibidos del backend:", data);

      // ✅ Guardar en contexto
      const userData = await login(data);
      console.log("📦 [Login.jsx] Datos guardados en contexto:", userData);

      // 🚨 AQUÍ ESTABA EL ERROR — ahora usamos los nombres correctos
      redirectByRole(userData?.rolid, userData?.rolnombre);

    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      setError(err.response?.data?.message || "Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <NavbarLanding />

      <div className="login-container">
        <h1 className="login-title">Iniciar Sesión</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p style={{ color: "#ff4d6d", marginBottom: "10px" }}>{error}</p>}

          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <div className="login-actions">
            <button type="submit" className="btn-login">Entrar</button>
            <button
              type="button"
              onClick={authService.googleLogin}
              className="btn-google"
            >
              <FcGoogle size={22} />
              <span style={{ marginLeft: "8px" }}>Iniciar sesión con Google</span>
            </button>
          </div>
        </form>

        <div className="login-links">
          <span>¿No tienes cuenta?</span>
          <a href="/register">Regístrate</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
