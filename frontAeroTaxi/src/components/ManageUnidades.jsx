import { useState, useEffect } from "react";
import unidadService from "../services/unidadServices";

import UnidadForm from "../components/unidades/UnidadForm.jsx";
import UnidadTable from "../components/unidades/UnidadTable.jsx";
import "../styles/styleUnidades.css";

function ManageUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [formData, setFormData] = useState({
    idUnidad: null,
    placa: "",
    serie: "",
    fotografia: "",
    estado: "DISPONIBLE",
    tipoTaxi: "NORMAL",
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
        setMessage("Unidad actualizada correctamente");
      } else {
        await unidadService.create(formData);
        setMessage("Unidad creada correctamente");
      }

      resetForm();
      cargarUnidades();
    } catch (error) {
      setMessage("Error al guardar la unidad");
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

    await unidadService.remove(id);
    cargarUnidades();
  };

  const resetForm = () => {
    setFormData({
      idUnidad: null,
      placa: "",
      serie: "",
      fotografia: "",
      estado: "DISPONIBLE",
      tipoTaxi: "NORMAL",
    });
    setIsEditing(false);
  };

  return (
    <div className="unidades-container">
      <UnidadForm
        formData={formData}
        isEditing={isEditing}
        loading={loading}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <UnidadTable
        unidades={unidades}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ManageUnidades;
