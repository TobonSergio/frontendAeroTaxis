import "../styles/styleLogin.css";
import "../styles/styleNavbarLanding.css";
import NavbarLanding from "../components/NavbarLanding";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "../api/axiosConfig";
import { useAuth } from "../hooks/useAuth"; // tu custom hook

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/login", { username, password });
      const token = response.data.token;

      login(token); // guarda en context y localStorage
      window.location.href = "/dashboard"; // redirige
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <NavbarLanding />
      <div className="login-container">
        <h1 className="login-title">Iniciar Sesión</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-actions">
            <button type="submit" className="btn-login">Entrar</button>
            <a
              href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`} 
              className="btn-google"
            >
              <FcGoogle size={34} style={{ marginRight: "8px" }} />
              Iniciar con Google
            </a>
          </div>

          <div className="login-links">
            <a href="#!">¿Olvidaste tu contraseña?</a>
            <span>|</span>
            <a href="/register">Registrarse</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
