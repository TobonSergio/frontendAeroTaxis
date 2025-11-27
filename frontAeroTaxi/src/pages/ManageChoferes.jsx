import { useState, useEffect } from "react";
import choferService from "../services/choferService.js";
import Navbar from "../components/Navbar.jsx";

import ChoferForm from "../components/choferes/ChoferForm.jsx";
import ChoferTable from "../components/choferes/ChoferTable.jsx";

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
        setMessage("Chofer actualizado correctamente");
      } else {
        await choferService.create(formData);
        setMessage("Chofer creado correctamente");
      }

      resetForm();
      cargarChoferes();
    } catch (error) {
      setMessage("Error al guardar el chofer");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (c) => {
    setFormData({ ...c, password: "" });
    setIsEditing(true);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Quieres eliminar este chofer?")) return;
    await choferService.remove(id);
    cargarChoferes();
  };

  const resetForm = () => {
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
  };

  return (
    <div className="dashboard">
      <Navbar />

      <main className="main-content">
        <div className="choferes-container">
          <ChoferForm
            formData={formData}
            isEditing={isEditing}
            loading={loading}
            message={message}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />

          <ChoferTable
            choferes={choferes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}

export default ManageChoferes;
