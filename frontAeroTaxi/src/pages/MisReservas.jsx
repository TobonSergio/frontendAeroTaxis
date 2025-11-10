// src/pages/MisReservas.jsx
import { useEffect, useState } from "react";
import clienteService from "../services/clienteService.js";
import Navbar from "../components/Sidebar.jsx"; // ✅ Importamos el Navbar

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        // ✅ Obtener cliente actual
        const cliente = await clienteService.getCurrentCliente();
        const data = await clienteService.getByClienteId(cliente.idCliente);
        setReservas(data);
      } catch (err) {
        console.error("❌ Error al cargar reservas del cliente:", err);
        setError("No se pudieron cargar tus reservas.");
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);

  if (loading) return <p className="loading-text">Cargando tus reservas...</p>;
  if (error) return <p className="text-message error">{error}</p>;

  return (
    <>
      {/* ✅ Navbar global */}
      <Navbar />

      <div className="mis-reservas container mt-4">
        <h1 className="text-center mb-4">Mis Reservas 📅</h1>

        <div className="table-responsive">
          <table className="table table-dark table-hover text-center align-middle tabla-reservas">
            <thead className="table-secondary">
              <tr>
                <th>ID</th>
                <th>Lugar de Recogida</th>
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
                  <tr key={r.idReserva}>
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
                  <td colSpan="7">No tienes reservas registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MisReservas;
