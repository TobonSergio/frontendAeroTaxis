import "../styles/styleProfile.css";
import Sidebar from "../components/Navbar.jsx";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import staffService from "../services/staffService.js";

function Profile() {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await staffService.getProfile();
        setStaff(data);
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
      cargo: form.cargo.value,
    };

    try {
      const updated = await staffService.updateProfile(updatedData);
      setStaff((prev) => ({ ...prev, ...updated }));
      setEditing(false);
      alert("✅ Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("❌ Error al actualizar perfil");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (!staff) return <p>No se encontró el perfil.</p>;

  return (
    <div className="profile-page">
      <Sidebar />
      <main className="profile-main">
        <header className="profile-header">
          <div className="avatar">
            <FaUserCircle size={100} />
          </div>

          <div className="user-info">
            <div className="user-info-header">
              <h1>
                {staff.nombre || "Sin nombre"} {staff.apellido || ""}
              </h1>
              <button
                className="btn-edit"
                onClick={() => setEditing(!editing)}
                title="Editar perfil"
              >
                <FaEdit size={20} />
              </button>
            </div>

            <p><strong>Correo:</strong> {staff.correo || "No disponible"}</p>
            <p><strong>Teléfono:</strong> {staff.telefono || "No registrado"}</p>
            <p><strong>Cargo:</strong> {staff.cargo || "Sin asignar"}</p>
            <p><strong>Rol:</strong> {staff.rolName || "Sin rol"}</p>
          </div>
        </header>

        {editing && (
          <section className="profile-section">
            <h2>✏️ Editar Perfil</h2>
            <form className="profile-form" onSubmit={handleSubmit}>
              <label>
                Nombre:
                <input name="nombre" defaultValue={staff.nombre || ""} required />
              </label>
              <label>
                Apellido:
                <input name="apellido" defaultValue={staff.apellido || ""} required />
              </label>
              <label>
                Teléfono:
                <input name="telefono" defaultValue={staff.telefono || ""} />
              </label>
              <label>
                Cargo:
                <input name="cargo" defaultValue={staff.cargo || ""} />
              </label>

              <div className="form-buttons">
                <button type="submit" className="btn-save">Guardar</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditing(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

export default Profile;
