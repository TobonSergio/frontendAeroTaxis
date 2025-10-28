// src/components/ManageReservasCliente.jsx
import { useState, useEffect } from "react";
import reservaServiceCliente from "../services/reservaServiceCliente.js";
import { useAuth } from "../hooks/useAuth.js";
import rutaService from "../services/rutaService.js"; // Para mostrar rutas por nombre
import unidadService from "../services/unidadServices.js"; // Para mostrar unidades por nombre

function ManageReservasCliente() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    idRuta: "",
    lugarRecogida: "",
    destino: "",
    fechaReserva: "",
    comentarios: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Cargar datos iniciales
  useEffect(() => {
    if (user) {
      cargarReservas();
      cargarRutas();
      cargarUnidades();
    }
  }, [user]);

  const cargarReservas = async () => {
    try {
      const data = await reservaServiceCliente.getAllByCliente(user.id);
      setReservas(data);
    } catch (error) {
      console.error(error);
      setMessage("Error al cargar las reservas");
    }
  };

  const cargarRutas = async () => {
    try {
      const data = await rutaService.getAll();
      setRutas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarUnidades = async () => {
    try {
      const data = await unidadService.getAll();
      setUnidades(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      idCliente: user.id,
      idStaff: null, // Cliente no asigna staff
      ...formData
    };

    try {
      if (formData.id) {
        await reservaServiceCliente.update(formData.id, payload);
        setMessage("Reserva actualizada correctamente");
      } else {
        await reservaServiceCliente.create(payload);
        setMessage("Reserva creada correctamente");
      }

      // Reset form
      setFormData({
        id: null,
        idRuta: "",
        lugarRecogida: "",
        destino: "",
        fechaReserva: "",
        comentarios: ""
      });

      await cargarReservas();
    } catch (error) {
      console.error(error);
      setMessage("Error al guardar la reserva");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reserva) => {
    setFormData({
      id: reserva.id,
      idRuta: reserva.ruta?.id || "",
      lugarRecogida: reserva.lugarRecogida,
      destino: reserva.destino,
      fechaReserva: reserva.fechaReserva?.slice(0, 16) || "", // YYYY-MM-DDTHH:mm
      comentarios: reserva.comentarios || ""
    });
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar reserva?")) return;
    try {
      await reservaServiceCliente.remove(id);
      setMessage("Reserva eliminada correctamente");
      await cargarReservas();
    } catch (error) {
      console.error(error);
      setMessage("Error al eliminar la reserva");
    }
  };

  return (
    <div className="reservas-container">
      <h2>Mis Reservas</h2>

      <form onSubmit={handleSubmit} className="reservas-form">
        <label>
          Ruta:
          <select name="idRuta" value={formData.idRuta} onChange={handleChange} required>
            <option value="">Seleccione una ruta</option>
            {rutas.map((ruta) => (
              <option key={ruta.idRuta} value={ruta.idRuta}>
                {ruta.inicio} → {ruta.fin}
              </option>
            ))}
          </select>
        </label>

        <label>
          Lugar de recogida:
          <input
            type="text"
            name="lugarRecogida"
            value={formData.lugarRecogida}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Destino:
          <input
            type="text"
            name="destino"
            value={formData.destino}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Fecha y hora:
          <input
            type="datetime-local"
            name="fechaReserva"
            value={formData.fechaReserva}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Comentarios:
          <input
            type="text"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : formData.id ? "Actualizar" : "Crear"}
        </button>
      </form>

      {message && <p className="text-message">{message}</p>}

      <h3>Listado de Reservas</h3>
      <table className="reservas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ruta</th>
            <th>Lugar Recogida</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.ruta ? `${r.ruta.inicio} → ${r.ruta.fin}` : r.idRuta}</td>
              <td>{r.lugarRecogida}</td>
              <td>{r.destino}</td>
              <td>{new Date(r.fechaReserva).toLocaleString()}</td>
              <td>{r.comentarios}</td>
              <td>
                <button onClick={() => handleEdit(r)}>✏️</button>
                <button onClick={() => handleDelete(r.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageReservasCliente;
