import Sidebar from "../components/Sidebar";
import AdminUserList from "../components/AdminUserList";
import CreateUserByAdmin from "../components/CreateUserByAdmin"; // ✅ importamos el nuevo componente
import "../styles/styleUsers.css";

function Users() {
  return (
    <div className="users-page">
      <Sidebar />
      <main className="users-main">
        <header>
          <h1>Gestión de Usuarios</h1>
        </header>

        {/* ✅ Formulario para crear nuevos usuarios */}
        <section className="create-user-section">
          <CreateUserByAdmin />
        </section>

        <hr />

        {/* ✅ Lista de usuarios existentes */}
        <section className="list-users-section">
          <AdminUserList />
        </section>
      </main>
    </div>
  );
}

export default Users;
