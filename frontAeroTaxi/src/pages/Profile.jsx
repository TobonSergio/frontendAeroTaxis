import "../styles/styleProfile.css";
import Sidebar from "../components/Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import userService from "../services/userService.js";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        alert("No se pudo cargar el perfil. Verifica que hayas iniciado sesión.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const updatedData = {
        name: form.name.value,
        lastName: form.lastName.value,
        email: form.email.value,
        number: form.number.value,
      };
      const updatedUser = await userService.updateUser(updatedData);
      setUser(updatedUser);
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Error al actualizar perfil");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (!user) return <p>No se pudo cargar el perfil.</p>;

  return (
    <div className="profile-page">
      <Sidebar />
      <main className="profile-main">
        <header className="profile-header">
          <div className="avatar">
            <FaUserCircle size={80} />
          </div>
          <div className="user-info">
            <h1>{user.name} {user.lastName}</h1>
            <p>{user.email}</p>
          </div>
        </header>

        <section className="profile-section">
          <h2>Editar Perfil</h2>
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input name="name" defaultValue={user.name} />
            </label>
            <label>
              Apellido:
              <input name="lastName" defaultValue={user.lastName} />
            </label>
            <label>
              Email:
              <input name="email" type="email" defaultValue={user.email} />
            </label>
            <label>
              Teléfono:
              <input name="number" defaultValue={user.number} />
            </label>
            <button type="submit" className="btn-save">Guardar Cambios</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
