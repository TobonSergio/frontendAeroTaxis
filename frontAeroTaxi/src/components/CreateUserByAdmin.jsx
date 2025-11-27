import { useEffect, useState } from "react";
import adminStaffService from "../services/adminUserService.js";

function CreateUserByAdmin({ selectedUser, setSelectedUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    cargo: "",
    rolId: 2,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({
        username: "",
        password: "",
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        cargo: "",
        rolId: 2,
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (selectedUser) {
        await adminStaffService.updateStaff(selectedUser.idStaff, formData);
        setMessage("Usuario actualizado correctamente");
        setSelectedUser(null);
      } else {
        const response = await adminStaffService.createStaff(formData);
        setMessage(`Usuario creado correctamente (ID: ${response.staffId})`);
      }
    } catch (error) {
      setMessage("Error al guardar usuario.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow border-0 bg-dark text-white">
        <div className="card-header bg-secondary text-white text-center">
          <h5 className="mb-0">
            {selectedUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
          </h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label text-white">Username</label>
              <input
                name="username"
                className="form-control bg-dark text-white border-secondary"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <input
                type="password"
                name="password"
                className="form-control bg-dark text-white border-secondary"
                value={formData.password}
                onChange={handleChange}
                required={!selectedUser}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-white">Nombre</label>
                <input
                  name="nombre"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label text-white">Apellido</label>
                <input
                  name="apellido"
                  className="form-control bg-dark text-white border-secondary"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Correo</label>
              <input
                type="email"
                name="correo"
                className="form-control bg-dark text-white border-secondary"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Teléfono</label>
              <input
                name="telefono"
                className="form-control bg-dark text-white border-secondary"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Cargo</label>
              <input
                name="cargo"
                className="form-control bg-dark text-white border-secondary"
                value={formData.cargo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Rol</label>
              <select
                name="rolId"
                className="form-select bg-dark text-white border-secondary"
                value={formData.rolId}
                onChange={handleChange}
                required
              >
                <option value={1}>ADMIN</option>
                <option value={2}>STAFF</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-danger flex-grow-1"
                disabled={loading}
              >
                {loading
                  ? selectedUser
                    ? "Guardando..."
                    : "Creando..."
                  : selectedUser
                  ? "Guardar"
                  : "Crear"}
              </button>

              {selectedUser && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {message && (
            <div
              className={`alert mt-3 ${
                message.includes("Error") ? "alert-danger" : "alert-success"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateUserByAdmin;
