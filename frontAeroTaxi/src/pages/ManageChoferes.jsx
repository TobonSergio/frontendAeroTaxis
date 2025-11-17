import { useState, useEffect } from "react";
import choferService from "../services/choferService.js";
import "../styles/styleChoferes.css";
import Navbar from "../components/Sidebar.jsx"; // ✅ Importar el navbar
import ActionButtons from "../components/ActionButtons.jsx";

function ManageChoferes() {
  const [choferes, setChoferes] = useState([]);
  const [formData, setFormData] = useState({
    idChofer: null,
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    licenciaConduccion: "",
    bilingue: false,
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    cargarChoferes();
  }, []);

  const cargarChoferes = async () => {
    try {
      const response = await choferService.getAll();
      const data = Array.isArray(response) ? response : response.data;
      setChoferes(data || []);
    } catch (error) {
      console.error("❌ Error al cargar choferes:", error);
      setMessage("Error al cargar los choferes");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isEditing) {
        await choferService.update(formData.idChofer, formData);
        setMessage("✅ Chofer actualizado correctamente");
      } else {
        await choferService.create(formData);
        setMessage("✅ Chofer creado correctamente");
      }

      setFormData({
        idChofer: null,
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        licenciaConduccion: "",
        bilingue: false,
        username: "",
        password: "",
      });
      setIsEditing(false);
      await cargarChoferes();
    } catch (error) {
      console.error("❌ Error al guardar chofer:", error);
      setMessage("Error al guardar el chofer. Revisa los datos o permisos.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (chofer) => {
    setFormData({
      ...chofer,
      password: "",
    });
    setIsEditing(true);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este chofer?")) return;
    try {
      await choferService.remove(id);
      setMessage("🗑️ Chofer eliminado correctamente");
      await cargarChoferes();
    } catch (error) {
      console.error("❌ Error al eliminar chofer:", error);
      setMessage("Error al eliminar el chofer.");
    }
  };

  return (
    <div className="dashboard"> {/* ✅ Estructura igual al Dashboard */}
      <Navbar />

      <main className="main-content">
        <div className="choferes-container">
          <section className="form-section">
            <h2>{isEditing ? "✏️ Editar Chofer" : "➕ Nuevo Chofer"}</h2>

            <form onSubmit={handleSubmit} className="choferes-form">
              <div className="form-grid">
                <label>
                  Nombre:
                  <input name="nombre" value={formData.nombre} onChange={handleChange} required />
                </label>

                <label>
                  Apellido:
                  <input name="apellido" value={formData.apellido} onChange={handleChange} required />
                </label>

                <label>
                  Correo:
                  <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
                </label>

                <label>
                  Teléfono:
                  <input name="telefono" value={formData.telefono} onChange={handleChange} required />
                </label>

                <label>
                  Licencia de Conducción:
                  <input
                    name="licenciaConduccion"
                    value={formData.licenciaConduccion}
                    onChange={handleChange}
                    required
                  />
                </label>

                {/* ✅ Switch más bonito para Bilingüe */}
                <div className="switch-field">
                  <span>Bilingüe:</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="bilingue"
                      checked={formData.bilingue}
                      onChange={handleChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                {!isEditing && (
                  <>
                    <label>
                      Usuario:
                      <input name="username" value={formData.username} onChange={handleChange} required />
                    </label>

                    <label>
                      Contraseña:
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </>
                )}
              </div>

              <div className="form-buttons">
                <button type="submit" disabled={loading}>
                  {loading
                    ? "Procesando..."
                    : isEditing
                    ? "Actualizar Chofer"
                    : "Crear Chofer"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        idChofer: null,
                        nombre: "",
                        apellido: "",
                        correo: "",
                        telefono: "",
                        licenciaConduccion: "",
                        bilingue: false,
                        username: "",
                        password: "",
                      });
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            {message && <p className="text-message">{message}</p>}
          </section>

          {/* Tabla */}
          <section className="table-section">
            <h2>📋 Listado de Choferes</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Licencia</th>
                  <th>Bilingüe</th>
                  <th>Estado</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {choferes.length > 0 ? (
                  choferes.map((c) => (
                    <tr key={c.idChofer}>
                      <td>{c.idChofer}</td>
                      <td>{c.nombre} {c.apellido}</td>
                      <td>{c.correo}</td>
                      <td>{c.telefono}</td>
                      <td>{c.licenciaConduccion}</td>
                      <td>{c.bilingue ? "Sí" : "No"}</td>
                      <td>{c.estado}</td>
                      <td>{c.rolNombre}</td>
                      <td>
                        <ActionButtons
                          onEdit={() => handleEdit(c)}
                          onDelete={() => handleDelete(c.idChofer)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No hay choferes registrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ManageChoferes;
