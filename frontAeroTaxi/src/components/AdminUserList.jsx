import { useEffect, useState } from "react";
import adminStaffService from "../services/adminUserService.js";

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

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <section className="mt-4">
      <h2 className="mb-3">Usuarios del Sistema</h2>

      {/* Contenedor responsive */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-dark table-striped table-hover table-bordered align-middle mb-0">
          <thead className="table-primary text-dark">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Cargo</th>
              <th>Rol</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {staffList.length > 0 ? (
              staffList.map((s) => (
                <tr key={s.idStaff}>
                  <td>{s.nombre}</td>
                  <td>{s.apellido}</td>
                  <td>{s.correo}</td>
                  <td>{s.telefono || "-"}</td>
                  <td>{s.cargo || "-"}</td>
                  <td>
                    <span
                      className={`badge ${
                        s.rolNombre === "ADMIN" ? "bg-danger" : "bg-info"
                      }`}
                    >
                      {s.rolNombre}
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="btn-group">
                      <button
                        onClick={() => handleEdit(s)}
                        className="btn btn-sm btn-warning"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(s.idStaff)}
                        className="btn btn-sm btn-danger"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminUserList;
