import { useState } from "react";
import adminStaffService from "../services/adminUserService.js";
import "../styles/styleUsers.css";

function CreateUserByAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    cargo: "",
    rolId: 2,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await adminStaffService.createStaff(formData);
      setMessage(`✅ Usuario creado correctamente (ID: ${response.staffId})`);
      setFormData({
        username: "",
        password: "",
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        cargo: "",
        rolId: 2,
      });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setMessage("❌ Error al crear usuario. Revisa los datos o el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-container">
      <h2 className="users-title">Crear Nuevo Usuario</h2>

      <form onSubmit={handleSubmit} className="users-form">
        <label>Username:
          <input name="username" value={formData.username} onChange={handleChange} required />
        </label>

        <label>Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>

        <label>Nombre:
          <input name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>

        <label>Apellido:
          <input name="apellido" value={formData.apellido} onChange={handleChange} required />
        </label>

        <label>Correo:
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
        </label>

        <label>Teléfono:
          <input name="telefono" value={formData.telefono} onChange={handleChange} />
        </label>

        <label>Cargo:
          <input name="cargo" value={formData.cargo} onChange={handleChange} required />
        </label>

        <label>Rol:
          <select name="rolId" value={formData.rolId} onChange={handleChange} required>
            <option value={1}>ADMIN</option>
            <option value={2}>STAFF</option>
          </select>
        </label>

        <div className="edit-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "✅ Crear Usuario"}
          </button>
        </div>
      </form>

      {message && (
        <p className={`text-message ${message.startsWith("❌") ? "error" : ""}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default CreateUserByAdmin;
