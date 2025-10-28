import "../styles/styleProfile.css";
import Sidebar from "../components/Sidebar";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import choferService from "../services/choferService.js";

function ChoferProfile() {
  const [chofer, setChofer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await choferService.getProfile();
        setChofer(data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        alert("❌ No se pudo cargar tu perfil. Verifica tu sesión.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      nombre: form.nombre.value,
      apellido: form.apellido.value,
      telefono: form.telefono.value,
      licenciaConduccion: form.licenciaConduccion.value,
      bilingue: form.bilingue.checked,
      username: chofer.usuario?.username, // opcional si quieres permitir cambiar
      correo: chofer.usuario?.correo,     // opcional si quieres permitir cambiar
      password: form.password?.value      // opcional
    };

    try {
      const updated = await choferService.updateProfile(updatedData);
      setChofer(updated);
      setEditing(false);
      alert("✅ Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("❌ Error al actualizar perfil");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (!chofer) return <p>No se encontró el perfil.</p>;

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
              <h1>{chofer.nombre} {chofer.apellido}</h1>
              <button
                className="btn-edit"
                onClick={() => setEditing(!editing)}
                title="Editar perfil"
              >
                <FaEdit size={20} />
              </button>
            </div>
            <p><strong>Correo:</strong> {chofer.usuario?.correo}</p>
            <p><strong>Teléfono:</strong> {chofer.telefono || "No registrado"}</p>
            <p><strong>Licencia:</strong> {chofer.licenciaConduccion || "No registrado"}</p>
            <p><strong>Bilingüe:</strong> {chofer.bilingue ? "Sí" : "No"}</p>
            <p><strong>Rol:</strong> {chofer.usuario?.rol?.nombre || "No asignado"}</p> {/* 🔹 rol */}
          </div>
        </header>

        {editing && (
          <section className="profile-section">
            <h2>Editar Perfil</h2>
            <form className="profile-form" onSubmit={handleSubmit}>
              <label>
                Nombre:
                <input name="nombre" defaultValue={chofer.nombre} required />
              </label>
              <label>
                Apellido:
                <input name="apellido" defaultValue={chofer.apellido} required />
              </label>
              <label>
                Teléfono:
                <input name="telefono" defaultValue={chofer.telefono} />
              </label>
              <label>
                Licencia:
                <input name="licenciaConduccion" defaultValue={chofer.licenciaConduccion} />
              </label>
              <label>
                Bilingüe:
                <input name="bilingue" type="checkbox" defaultChecked={chofer.bilingue} />
              </label>
              <label>
                Contraseña (opcional):
                <input name="password" type="password" placeholder="Nueva contraseña" />
              </label>
              <button type="submit" className="btn-save">Guardar Cambios</button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

export default ChoferProfile;
