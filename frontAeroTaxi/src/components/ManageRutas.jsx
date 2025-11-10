import { useState, useEffect } from "react";
import rutaService from "../services/rutaService.js";
import "../styles/stylesRutas.css";

function ManageRutas() {
  const [rutas, setRutas] = useState([]);
  const [formData, setFormData] = useState({
    idRuta: null,
    inicio: "",
    fin: "",
    precio: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    cargarRutas();
  }, []);

  const cargarRutas = async () => {
    try {
      const data = await rutaService.getAll();
      setRutas(data);
    } catch (error) {
      console.error("❌ Error al cargar rutas:", error);
      setMessage("Error al cargar las rutas");
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
        await rutaService.update(formData.idRuta, formData);
        setMessage("✅ Ruta actualizada correctamente");
      } else {
        await rutaService.create(formData);
        setMessage("✅ Ruta creada correctamente");
      }

      setFormData({ idRuta: null, inicio: "", fin: "", precio: "" });
      setIsEditing(false);
      await cargarRutas();
    } catch (error) {
      console.error("❌ Error al guardar ruta:", error);
      setMessage("Error al guardar la ruta. Revisa los datos o permisos.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ruta) => {
    setFormData(ruta);
    setIsEditing(true);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta ruta?")) return;
    try {
      await rutaService.remove(id);
      setMessage("🗑️ Ruta eliminada correctamente");
      await cargarRutas();
    } catch (error) {
      console.error("❌ Error al eliminar ruta:", error);
      setMessage("Error al eliminar la ruta.");
    }
  };

  return (
    <div className="rutas-container">
      <h2 className="rutas-title">🚍 Gestión de Rutas</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="rutas-form">
        <div className="form-group">
          <label>Inicio:</label>
          <input
            name="inicio"
            value={formData.inicio}
            onChange={handleChange}
            placeholder="Ej: Medellín"
            required
          />
        </div>

        <div className="form-group">
          <label>Fin:</label>
          <input
            name="fin"
            value={formData.fin}
            onChange={handleChange}
            placeholder="Ej: Bogotá"
            required
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Ej: 120000"
            required
          />
        </div>

        <div className="edit-buttons">
          <button type="submit" disabled={loading}>
            {loading
              ? "Procesando..."
              : isEditing
              ? "💾 Actualizar Ruta"
              : "✅ Crear Ruta"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({ idRuta: null, inicio: "", fin: "", precio: "" });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {message && <p className="text-message">{message}</p>}

      {/* Tabla de rutas */}
      <div className="rutas-table-section">
        <h3>Listado de Rutas</h3>
        <table className="rutas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rutas.map((ruta) => (
              <tr key={ruta.idRuta}>
                <td>{ruta.idRuta}</td>
                <td>{ruta.inicio}</td>
                <td>{ruta.fin}</td>
                <td>${ruta.precio}</td>
                <td>
                  <button onClick={() => handleEdit(ruta)}>✏️</button>
                  <button onClick={() => handleDelete(ruta.idRuta)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageRutas;
