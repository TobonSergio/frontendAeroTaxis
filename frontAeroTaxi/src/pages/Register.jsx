import { useState } from "react";
import NavbarLanding from "../components/NavbarLanding";
import "../styles/styleRegister.css";
import authService from "../services/authService"; // ✅ usamos el service

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await authService.register({
        name,
        lastName,
        email,
        number,
        username,
        password,
      });
      setSuccess("✅ Usuario registrado correctamente. Revisa tu correo para verificar la cuenta.");
    } catch (err) {
      setError(err.response?.data || "❌ Error al registrar usuario");
    }
  };

  return (
    <div className="register-page">
      <NavbarLanding />
      <div className="register-container">
        <h1 className="register-title">Crear Cuenta</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Apellido</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Correo</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input type="tel" value={number} onChange={(e) => setNumber(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Usuario</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="register-actions">
            <button type="submit" className="btn-register">Registrarse</button>
          </div>
        </form>

        <div className="register-links">
          <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
