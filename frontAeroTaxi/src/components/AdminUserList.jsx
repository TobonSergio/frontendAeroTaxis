import { useEffect, useState } from "react";
import adminStaffService from "../services/adminUserService.js";
import "../styles/styleUsers.css";

function AdminUserList() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({});

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

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await adminStaffService.deleteStaff(id);
      setStaffList(staffList.filter((s) => s.idStaff !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff.idStaff);
    setFormData({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (!payload.password) delete payload.password;

    try {
      await adminStaffService.updateStaff(editingStaff, payload);
      await loadStaff();
      setEditingStaff(null);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
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
                <button className="btn-edit" onClick={() => handleEdit(s)}>✏️</button>
                <button className="btn-delete" onClick={() => handleDelete(s.idStaff)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingStaff && (
        <div className="edit-form-container">
          <h3 className="users-title" style={{ fontSize: "1.4rem" }}>Editar Usuario</h3>
          <form onSubmit={handleSaveEdit} className="users-form">
            <label>Username:
              <input name="username" value={formData.username} onChange={handleChange} required />
            </label>
            <label>Password:
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
            <label>Nombre:
              <input name="nombre" value={formData.nombre} onChange={handleChange} required />
            </label>
            <label>Apellido:
              <input name="apellido" value={formData.apellido} onChange={handleChange} required />
            </label>
            <label>Correo:
              <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
            </label>
            <label>Teléfono:
              <input name="telefono" value={formData.telefono} onChange={handleChange} />
            </label>
            <label>Cargo:
              <input name="cargo" value={formData.cargo} onChange={handleChange} />
            </label>
            <label>Rol:
              <select name="rolId" value={formData.rolId} onChange={handleChange} required>
                <option value={1}>ADMIN</option>
                <option value={2}>STAFF</option>
              </select>
            </label>

            <div className="edit-buttons">
              <button type="submit">💾 Guardar</button>
              <button type="button" className="btn-cancel" onClick={() => setEditingStaff(null)}>❌ Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminUserList;
