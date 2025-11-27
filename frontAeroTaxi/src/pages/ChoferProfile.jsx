import "../styles/styleProfile.css";
import Sidebar from "../components/Navbar.jsx";
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
        alert("❌ No se pudo cargar tu perfil.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;

    const updated = {
      nombre: f.nombre.value,
      apellido: f.apellido.value,
      telefono: f.telefono.value,
      licenciaConduccion: f.licenciaConduccion.value,
      bilingue: f.bilingue.checked,
      username: chofer.usuario?.username,
      correo: chofer.usuario?.correo,
      password: f.password.value || null,
    };

    try {
      const r = await choferService.updateProfile(updated);
      setChofer(r);
      setEditing(false);
      alert("✅ Perfil actualizado");
    } catch (e) {
      alert("❌ Error actualizando");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (!chofer) return <p>No se encontró el perfil.</p>;

  return (
    <div className="profile-layout">
      <Sidebar />

      <main className="profile-content">

        {/* HEADER */}
        <header className="profile-card header-card">
          <div className="avatar">
            <FaUserCircle size={90} />
          </div>

          <div className="header-details">
            <h1>{chofer.nombre} {chofer.apellido}</h1>
            <button className="btn-edit" onClick={() => setEditing(!editing)}>
              <FaEdit /> Editar
            </button>
          </div>

          <div className="info-grid">
            <p><strong>Correo:</strong> {chofer.usuario?.correo}</p>
            <p><strong>Teléfono:</strong> {chofer.telefono || "No registrado"}</p>
            <p><strong>Licencia:</strong> {chofer.licenciaConduccion || "No registrado"}</p>
            <p><strong>Bilingüe:</strong> {chofer.bilingue ? "Sí" : "No"}</p>
            <p><strong>Rol:</strong> {chofer.usuario?.rol?.nombre}</p>
          </div>
        </header>

        {/* FORMULARIO */}
        {editing && (
          <section className="profile-card form-card">
            <h2>Editar Perfil</h2>

            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-grid">
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

                <label className="check-field">
                  <span>Bilingüe:</span>
                  <input type="checkbox" name="bilingue" defaultChecked={chofer.bilingue} />
                </label>

                <label>
                  Contraseña:
                  <input name="password" type="password" placeholder="Nueva contraseña (opcional)" />
                </label>
              </div>

              <button type="submit" className="btn-save">Guardar Cambios</button>
            </form>
          </section>
        )}

      </main>
    </div>
  );
}

export default ChoferProfile;
