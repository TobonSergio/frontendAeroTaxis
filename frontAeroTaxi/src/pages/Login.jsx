// src/pages/Login.jsx
import "../styles/styleLogin.css";
import "../styles/styleNavbarLanding.css";
import NavbarLanding from "../components/NavbarLanding";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import authService from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // importamos el icono

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Manejar token de Google si viene en la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      login(token)
        .then(() => navigate("/dashboard"))
        .catch(() => setError("No se pudo iniciar sesión con Google"));
    }
  }, [location.search]);

  // Login con usuario y contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.login({ username, password });
      const tokenFromBackend = response.data.token;

      await login(tokenFromBackend);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Usuario o contraseña incorrectos"
      );
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
            <button type="submit" className="btn-login">
              Entrar
            </button>
            <button type="button" onClick={authService.googleLogin} className="btn-google">
              <FcGoogle size={22} /> {/* icono */}
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
