import { useState, useEffect } from "react";
import rutaService from "../services/rutaService.js";
import "../styles/stylesRutas.css";
import RutaForm from "./rutas/RutaForm.jsx";
import RutasTable from "./rutas/RutasTable.jsx";

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
      cargarRutas();
    } catch (e) {
      console.error(e);
      setMessage("Error al guardar la ruta");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ruta) => {
    setFormData(ruta);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta ruta?")) return;

    try {
      await rutaService.remove(id);
      setMessage("🗑️ Ruta eliminada");
      cargarRutas();
    } catch (e) {
      console.error(e);
      setMessage("Error al eliminar.");
    }
  };

  return (
    <div className="rutas-container">
      <h2 className="rutas-title">Gestión de Rutas</h2>

      <RutaForm
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSubmit={handleSubmit}
      />

      {message && <p className="text-message">{message}</p>}

      <RutasTable rutas={rutas} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default ManageRutas;
