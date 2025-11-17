import { useEffect, useState } from "react";
import "../styles/styleDashboard.css";
import Navbar from "../components/Sidebar.jsx";
import reservaService from "../services/reservaService.js";
import StatusTag from "../components/StatusTag.jsx";

function Dashboard() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await reservaService.getAllForDashboard();
        setReservas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error al cargar las reservas del dashboard:", err);
        setError("No se pudieron cargar las reservas del dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  // 📊 Cálculos simples
  const totalReservas = reservas.length;
  const reservasPendientes = reservas.filter(r => r.estado === "PENDIENTE").length;
  const reservasConfirmadas = reservas.filter(r => r.estado === "CONFIRMADA").length;
  const notificaciones = totalReservas;

  // Mostrar las últimas 3 reservas
  const ultimasReservas = reservas.slice(0, 3);

  if (loading) return <p className="loading-text">Cargando datos...</p>;
  if (error) return <p className="text-message error">{error}</p>;

  return (
    <div className="dashboard">
      <Navbar />

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Bienvenido al Dashboard</h1>
          <p>Gestiona tus reservas y obtén un resumen general de la operación.</p>
        </header>

        <section className="cards">
          <div className="custom-card">
            <h3>Reservas pendientes</h3>
            <p>{reservasPendientes}</p>
          </div>
          <div className="custom-card">
            <h3>Reservas confirmadas</h3>
            <p>{reservasConfirmadas}</p>
          </div>
          <div className="custom-card">
            <h3>Total de reservas</h3>
            <p>{totalReservas}</p>
          </div>
        </section>

        <section className="table-section">
          <h2>Últimas Reservas</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Destino</th>
                <th>Fecha de Reserva</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ultimasReservas.length > 0 ? (
                ultimasReservas.map((reserva) => (
                  <tr key={reserva.idReserva}>
                    <td>#{reserva.idReserva}</td>
                    <td>{reserva.nombreCliente}</td>
                    <td>{reserva.destino || "—"}</td>
                    <td>
                      {reserva.fechaReserva
                        ? new Date(reserva.fechaReserva).toLocaleString("es-CO", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "Sin fecha"}
                    </td>
                    <td>
                      <StatusTag estado={reserva.estado} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay reservas registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
