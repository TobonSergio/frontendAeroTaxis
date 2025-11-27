import { useState } from "react";
import Sidebar from "../components/Navbar";
import AdminUserList from "../components/AdminUserList";
import CreateUserByAdmin from "../components/CreateUserByAdmin";

function Users() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="flex-grow-1 p-4">
        <div className="container-fluid">

          {/* Formulario */}
          <section className="mb-5">
            <CreateUserByAdmin
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </section>

          <hr className="my-4" />

          {/* Tabla */}
          <section>
            <AdminUserList setSelectedUser={setSelectedUser} />
          </section>

        </div>
      </main>
    </div>
  );
}

export default Users;
