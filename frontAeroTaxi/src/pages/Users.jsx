import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminUserList from "../components/AdminUserList";
import CreateUserByAdmin from "../components/CreateUserByAdmin";
import "../styles/styleUsers.css";

function Users() {
  // 🔹 Estado compartido para manejar el usuario seleccionado al editar
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="users-page">
      <Sidebar />
      <main className="users-main">
        {/* Formulario para crear o editar usuario */}
        <section className="create-user-section">
          <CreateUserByAdmin
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </section>

        <hr />

        {/* Lista de usuarios */}
        <section className="list-users-section">
          <AdminUserList setSelectedUser={setSelectedUser} />
        </section>
      </main>
    </div>
  );
}

export default Users;
