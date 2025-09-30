import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import "../styles/styleUsers.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    number: "",
    role: "STAFF", // valor por defecto
  });

  // Simular carga de usuarios
  useEffect(() => {
    const fakeUsers = [
      { id: 1, name: "Juan", lastName: "Pérez", email: "juan@example.com", number: "3001234567", role: "ADMIN" },
      { id: 2, name: "Ana", lastName: "García", email: "ana@example.com", number: "3109876543", role: "STAFF" },
      { id: 3, name: "Carlos", lastName: "López", email: "carlos@example.com", number: "3015554444", role: "CHOFER" },
    ];

    setTimeout(() => {
      setUsers(fakeUsers);
      setLoading(false);
    }, 500); // simula un pequeño delay
  }, []);

  // Crear nuevo usuario (solo en frontend)
  const handleCreateUser = (e) => {
    e.preventDefault();

    const createdUser = {
      ...newUser,
      id: users.length + 1, // generar id temporal
    };

    setUsers([...users, createdUser]); // actualizar lista
    setNewUser({
      name: "",
      lastName: "",
      email: "",
      number: "",
      role: "STAFF",
    });
    alert("Usuario creado correctamente (modo demo)");
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="users-page">
      <Sidebar />
      <main className="users-main">
        <header>
          <h1>Gestión de Usuarios</h1>
        </header>

        {/* Tabla de usuarios */}
        <section>
          <h2>Lista de Usuarios</h2>
          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.number}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Formulario para crear usuario */}
        <section>
          <h2>Crear Nuevo Usuario</h2>
          <form className="users-form" onSubmit={handleCreateUser}>
            <label>
              Nombre:
              <input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
            </label>
            <label>
              Apellido:
              <input
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </label>
            <label>
              Teléfono:
              <input
                value={newUser.number}
                onChange={(e) => setNewUser({ ...newUser, number: e.target.value })}
              />
            </label>
            <label>
              Rol:
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="STAFF">STAFF</option>
                <option value="CHOFER">CHOFER</option>
              </select>
            </label>
            <button type="submit">Crear Usuario</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Users;
