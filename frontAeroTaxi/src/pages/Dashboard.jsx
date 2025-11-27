import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import reservaService from "../services/reservaService.js";
import Card from "../components/Dashboard/Card.jsx";
import DashboardHeader from "../components/Dashboard/DashboardHeader.jsx";
import UltimasReservasTable from "../components/Dashboard/UltimasReservasTable.jsx";

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

  if (loading) return <p className="text-center mt-5">Cargando datos...</p>;
  if (error) return <p className="alert alert-danger mt-5">{error}</p>;

  const totalReservas = reservas.length;
  const reservasPendientes = reservas.filter(r => r.estado === "PENDIENTE").length;
  const reservasConfirmadas = reservas.filter(r => r.estado === "CONFIRMADA").length;
  const ultimasReservas = reservas.slice(0, 3);

  return (
    <div className="dashboard">
      <Navbar />

      <main className="container my-4">
        <DashboardHeader />

        <div className="row">
          <Card title="Reservas pendientes" value={reservasPendientes} />
          <Card title="Reservas confirmadas" value={reservasConfirmadas} />
          <Card title="Total de reservas" value={totalReservas} />
        </div>

        <UltimasReservasTable reservas={ultimasReservas} />
      </main>
    </div>
  );
}

export default Dashboard;
