// src/pages/MisReservasStaff.jsx
import { useEffect, useState } from "react";
import staffService from "../services/staffService.js";
import Navbar from "../components/Navbar.jsx";
import CreateReservaStaff from "../components/CreateReservaStaff.jsx"; // ⬅️ INTEGRADO
import "../styles/styleMisReservasCliente.css";

function MisReservasStaff() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [staff, setStaff] = useState(null);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  // 🔹 Cargar reservas del staff
  const fetchReservas = async () => {
    try {
      const staffData = await staffService.getProfile();
      setStaff(staffData);

      const data = await staffService.getReservasByStaff(staffData.idStaff);
      setReservas(data);
    } catch (err) {
      console.error("❌ Error al cargar reservas del staff:", err);
      setError("No se pudieron cargar las reservas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  // 🔹 Abrir modal detalle
  const abrirDetalle = (reserva) => {
    setReservaSeleccionada(reserva);
  };

  // 🔹 Cerrar modal
  const cerrarModal = () => {
    setReservaSeleccionada(null);
  };

  if (loading) return <p className="loading-text">Cargando reservas...</p>;
  if (error) return <p className="text-message error">{error}</p>;

  return (
    <>
      <Navbar />

      <div className="reservas-page">
        <main className="reservas-main">

          {/* ⭐ FORMULARIO PARA CREAR RESERVAS (STAFF) ⭐ */}
          <section className="crear-reserva-section">
            <CreateReservaStaff onReservaCreada={fetchReservas} />
          </section>

          {/* ⭐ TABLA DE RESERVAS ⭐ */}
          <section className="reservas-table-section">
            <h2>Reservas Creadas por Staff</h2>

            <table className="tabla-reservas">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Lugar Recogida</th>
                  <th>Destino</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                  <th>Comentarios</th>
                </tr>
              </thead>

              <tbody>
                {reservas.length > 0 ? (
                  reservas.map((r) => (
                    <tr
                      key={r.idReserva}
                      className="fila-reserva"
                      onClick={() => abrirDetalle(r)}
                    >
                      <td>#{r.idReserva}</td>
                      <td>{r.lugarRecogida}</td>
                      <td>{r.destino}</td>
                      <td>{new Date(r.fechaReserva).toLocaleDateString("es-CO")}</td>
                      <td>{r.horaReserva}</td>
                      <td className={`estado ${r.estado.toLowerCase()}`}>{r.estado}</td>
                      <td>{r.comentarios || "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No hay reservas creadas por este staff.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* 🪟 Modal detalle */}
      {reservaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-detalle" onClick={(e) => e.stopPropagation()}>
            <h2>Detalle de la Reserva #{reservaSeleccionada.idReserva}</h2>

            <div className="detalle-section">
              <h3>Información General</h3>
              <p><strong>Estado:</strong> {reservaSeleccionada.estado}</p>
              <p><strong>Fecha:</strong> {new Date(reservaSeleccionada.fechaReserva).toLocaleDateString("es-CO")}</p>
              <p><strong>Hora:</strong> {reservaSeleccionada.horaReserva}</p>
              <p><strong>Comentarios:</strong> {reservaSeleccionada.comentarios || "—"}</p>
            </div>

            <div className="detalle-section">
              <h3>Staff</h3>
              <p><strong>Nombre:</strong> {staff?.nombre}</p>
              <p><strong>Correo:</strong> {staff?.correo}</p>
              <p><strong>Rol:</strong> {staff?.tipoPerfil || "STAFF"}</p>
            </div>

            <button className="cerrar-modal-btn" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MisReservasStaff;
