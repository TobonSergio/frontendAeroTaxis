// src/pages/ClienteProfile.jsx
import "../styles/styleProfile.css";
import Sidebar from "../components/Navbar.jsx";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import clienteService from "../services/clienteService.js";

function ClienteProfile() {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Cargar cliente actual
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const data = await clienteService.getCurrentCliente();
        setCliente(data);
      } catch (error) {
        console.error("Error al cargar perfil del cliente:", error);
        alert("No se pudo cargar el perfil. Verifica que hayas iniciado sesión.");
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, []);

  // 🔹 Actualizar cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const updatedData = {
        nombre: form.nombre.value,
        apellido: form.apellido.value,
        telefono: form.telefono.value,
        direccion: form.direccion.value,
        ciudad: form.ciudad.value,
      };

      const updatedCliente = await clienteService.updateCliente(updatedData);
      setCliente(updatedCliente);
      alert("✅ Perfil actualizado correctamente");
      setShowForm(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("❌ Error al actualizar perfil");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (!cliente) return <p>No se pudo cargar el perfil del cliente.</p>;

  return (
    <div className="profile-page">
      <Sidebar />
      <main className="profile-main">
        <header className="profile-header">
          <div className="avatar">
            <FaUserCircle size={80} />
          </div>

          <div className="user-info">
            <div className="user-info-header">
              <h1>
                {cliente.nombre || "Sin nombre"} {cliente.apellido || ""}
              </h1>
              <button
                className="btn-edit"
                onClick={() => setShowForm(!showForm)}
                title="Editar perfil"
              >
                <FaEdit size={20} />
              </button>
            </div>

            <p><strong>Correo:</strong> {cliente.correo || "No disponible"}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono || "No registrado"}</p>
            <p><strong>Dirección:</strong> {cliente.direccion || "No registrada"}</p>
            <p><strong>Ciudad:</strong> {cliente.ciudad || "No registrada"}</p>
            <p><strong>Rol:</strong> {cliente.rolName || "Sin rol"}</p>
          </div>
        </header>

        {showForm && (
          <section className="profile-section">
            <h2>Editar Perfil</h2>
            <form className="profile-form" onSubmit={handleSubmit}>
              <label>
                Nombre:
                <input name="nombre" defaultValue={cliente.nombre} />
              </label>
              <label>
                Apellido:
                <input name="apellido" defaultValue={cliente.apellido} />
              </label>
              <label>
                Teléfono:
                <input name="telefono" defaultValue={cliente.telefono} />
              </label>
              <label>
                Dirección:
                <input name="direccion" defaultValue={cliente.direccion} />
              </label>
              <label>
                Ciudad:
                <input name="ciudad" defaultValue={cliente.ciudad} />
              </label>
              <button type="submit" className="btn-save">
                Guardar Cambios
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

export default ClienteProfile;
