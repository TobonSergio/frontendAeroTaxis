import { useState, useEffect } from "react";
import unidadService from "../services/unidadServices";
import "../styles/styleUnidades.css";

function ManageUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [formData, setFormData] = useState({
    idUnidad: null,
    placa: "",
    serie: "",
    fotografia: "",
    estado: "DISPONIBLE",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    cargarUnidades();
  }, []);

  const cargarUnidades = async () => {
    try {
      const data = await unidadService.getAll();
      setUnidades(data);
    } catch (error) {
      console.error("❌ Error al cargar unidades:", error);
      setMessage("Error al cargar las unidades");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isEditing) {
        await unidadService.update(formData.idUnidad, formData);
        setMessage("✅ Unidad actualizada correctamente");
      } else {
        await unidadService.create(formData);
        setMessage("✅ Unidad creada correctamente");
      }

      setFormData({
        idUnidad: null,
        placa: "",
        serie: "",
        fotografia: "",
        estado: "DISPONIBLE",
      });
      setIsEditing(false);
      await cargarUnidades();
    } catch (error) {
      console.error("❌ Error al guardar unidad:", error);
      setMessage("Error al guardar la unidad. Revisa los datos o permisos.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (unidad) => {
    setFormData(unidad);
    setIsEditing(true);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta unidad?")) return;
    try {
      await unidadService.remove(id);
      setMessage("🗑️ Unidad eliminada correctamente");
      await cargarUnidades();
    } catch (error) {
      console.error("❌ Error al eliminar unidad:", error);
      setMessage("Error al eliminar la unidad.");
    }
  };

  return (
    <div className="unidades-container">
      <header className="unidades-header">
        <h1>🚐 Gestión de Unidades</h1>
        <p>Administra las unidades disponibles, ocupadas o en mantenimiento.</p>
      </header>

      {/* Formulario */}
      <section className="form-section">
        <h2>{isEditing ? "✏️ Editar Unidad" : "➕ Nueva Unidad"}</h2>

        <form onSubmit={handleSubmit} className="unidades-form">
          <div className="form-grid">
            <label>
              Placa:
              <input
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Serie:
              <input
                name="serie"
                value={formData.serie}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Fotografía (URL):
              <input
                name="fotografia"
                value={formData.fotografia}
                onChange={handleChange}
              />
            </label>

            <label>
              Estado:
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
              >
                <option value="DISPONIBLE">DISPONIBLE</option>
                <option value="OCUPADA">OCUPADA</option>
                <option value="MANTENIMIENTO">MANTENIMIENTO</option>
              </select>
            </label>
          </div>

          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading
                ? "Procesando..."
                : isEditing
                ? "💾 Actualizar Unidad"
                : "✅ Crear Unidad"}
            </button>

            {isEditing && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    idUnidad: null,
                    placa: "",
                    serie: "",
                    fotografia: "",
                    estado: "DISPONIBLE",
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
        <h2>📋 Listado de Unidades</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Placa</th>
              <th>Serie</th>
              <th>Fotografía</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unidades.length > 0 ? (
              unidades.map((unidad) => (
                <tr key={unidad.idUnidad}>
                  <td>{unidad.idUnidad}</td>
                  <td>{unidad.placa}</td>
                  <td>{unidad.serie}</td>
                  <td>
                    {unidad.fotografia ? (
                      <img
                        src={unidad.fotografia}
                        alt="Foto unidad"
                        width="60"
                        height="40"
                      />
                    ) : (
                      "Sin foto"
                    )}
                  </td>
                  <td>
                    <span
                      className={`estado ${
                        unidad.estado === "DISPONIBLE"
                          ? "estado-disponible"
                          : unidad.estado === "OCUPADA"
                          ? "estado-ocupada"
                          : "estado-mantenimiento"
                      }`}
                    >
                      {unidad.estado}
                    </span>
                  </td>
                  <td className="actions">
                    <button onClick={() => handleEdit(unidad)}>✏️</button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(unidad.idUnidad)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay unidades registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ManageUnidades;
