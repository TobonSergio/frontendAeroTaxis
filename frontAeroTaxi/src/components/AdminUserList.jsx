import { useEffect, useState } from "react";
import adminStaffService from "../services/adminUserService.js";
import "../styles/styleUsers.css";
import ActionButtons from "../components/ActionButtons.jsx";


function AdminUserList({ setSelectedUser }) {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      setLoading(true);
      const data = await adminStaffService.getAllStaff();
      setStaffList(data);
    } catch (error) {
      console.error("Error al cargar staff:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Aquí estaba el problema: faltaba definir handleEdit correctamente
  const handleEdit = (staff) => {
    setSelectedUser({
      idStaff: staff.idStaff,
      username: staff.username || "",
      password: "",
      nombre: staff.nombre,
      apellido: staff.apellido,
      correo: staff.correo,
      telefono: staff.telefono || "",
      cargo: staff.cargo || "",
      rolId: staff.rolNombre === "ADMIN" ? 1 : 2,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await adminStaffService.deleteStaff(id);
      setStaffList(staffList.filter((s) => s.idStaff !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  if (loading) return <p className="loading-text">Cargando usuarios...</p>;

  return (
    <div className="users-container">
      <h2 className="users-title">Usuarios del Sistema</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Cargo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((s) => (
            <tr key={s.idStaff}>
              <td>{s.nombre}</td>
              <td>{s.apellido}</td>
              <td>{s.correo}</td>
              <td>{s.telefono || "-"}</td>
              <td>{s.cargo || "-"}</td>
              <td>{s.rolNombre}</td>
              <td>
                <ActionButtons
                  onEdit={() => handleEdit(s)}
                  onDelete={() => handleDelete(s.idStaff)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserList;
