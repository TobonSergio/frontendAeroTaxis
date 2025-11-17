// src/pages/MisReservas.jsx
import { useEffect, useState } from "react";
import clienteService from "../services/clienteService.js";
import Navbar from "../components/Sidebar.jsx";
import ManageReservasCliente from "../components/ManageReservasCliente.jsx";
import "../styles/styleMisReservasCliente.css";

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cliente, setCliente] = useState(null);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      console.log("🔹 Iniciando carga de reservas...");
      try {
        const clienteData = await clienteService.getCurrentCliente();
        console.log("✅ Cliente actual:", clienteData);
        setCliente(clienteData);

        const data = await clienteService.getByClienteId(clienteData.idCliente);
        console.log("✅ Reservas obtenidas del cliente:", data);
        setReservas(data);
      } catch (err) {
        console.error("❌ Error al cargar reservas:", err);
        setError("No se pudieron cargar tus reservas.");
      } finally {
        setLoading(false);
        console.log("🔹 Carga de reservas finalizada");
      }
    };
    fetchReservas();
  }, []);

  const actualizarReservas = async () => {
    if (!cliente) return;
    console.log("🔹 Actualizando reservas...");
    try {
      const data = await clienteService.getByClienteId(cliente.idCliente);
      console.log("✅ Reservas actualizadas:", data);
      setReservas(data);
    } catch (err) {
      console.error("❌ Error al actualizar reservas:", err);
    }
  };

  const abrirDetalleReserva = (reserva) => {
    console.log("🔹 Abriendo modal de reserva:", reserva);
    setReservaSeleccionada(reserva);
  };

  const cerrarModal = () => {
    console.log("🔹 Cerrando modal de reserva");
    setReservaSeleccionada(null);
  };

const descargarPdf = async (idReserva) => {
  console.log(`🔹 Iniciando descarga de PDF para reserva ID: ${idReserva}`);
  try {
    const baseUrl = import.meta.env.VITE_API_URL; // <-- aquí tomamos la URL del .env
    const response = await fetch(`${baseUrl}/api/reservas/pdf/${idReserva}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("🔹 Respuesta del servidor recibida:", response);

    if (!response.ok) {
      console.error("❌ Respuesta no OK del servidor:", response.status, response.statusText);
      throw new Error("No se pudo descargar el PDF");
    }

    const blob = await response.blob();
    console.log("✅ Blob del PDF recibido:", blob);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reserva_${idReserva}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    console.log("✅ PDF descargado correctamente para reserva ID:", idReserva);
  } catch (err) {
    console.error("❌ Error al descargar PDF:", err);
    alert("El comprobante aún no está disponible.");
  }
};



  if (loading) return <p className="loading-text">Cargando tus reservas...</p>;
  if (error) return <p className="text-message error">{error}</p>;

  return (
    <>
      <Navbar />

      <div className="reservas-page">
        <main className="reservas-main">
          {/* 📋 FORMULARIO */}
          <section className="reserva-form-section">
            <h2>Crear Nueva Reserva</h2>
            <ManageReservasCliente onReservaCreada={actualizarReservas} />
          </section>

          {/* 📊 TABLA DE RESERVAS */}
          <section className="reservas-table-section">
            <h2>Reservas Realizadas</h2>

            <table className="tabla-reservas">
              <thead>
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
                    <tr
                      key={r.idReserva}
                      className="fila-reserva"
                      onClick={() => abrirDetalleReserva(r)}
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
                    <td colSpan="7">No tienes reservas registradas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* 🪟 MODAL DETALLE DE RESERVA */}
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
              <h3>Cliente</h3>
              <p><strong>Nombre:</strong> {cliente?.nombre || "Desconocido"}</p>
              <p><strong>Correo:</strong> {cliente?.correo}</p>
              <p><strong>Tipo Perfil:</strong> {cliente?.tipoPerfil}</p>
            </div>

            {reservaSeleccionada.staff && (
              <div className="detalle-section">
                <h3>Staff Asignado</h3>
                <p><strong>Nombre:</strong> {reservaSeleccionada.staff.nombre}</p>
                <p><strong>Correo:</strong> {reservaSeleccionada.staff.correo}</p>
              </div>
            )}

            {reservaSeleccionada.chofer && (
              <div className="detalle-section">
                <h3>Chofer</h3>
                <p><strong>Nombre:</strong> {reservaSeleccionada.chofer.nombre}</p>
                <p><strong>Licencia:</strong> {reservaSeleccionada.chofer.licencia}</p>
              </div>
            )}

            {reservaSeleccionada.unidad && (
              <div className="detalle-section">
                <h3>Unidad</h3>
                <p><strong>Placa:</strong> {reservaSeleccionada.unidad.placa}</p>
                <p><strong>Modelo:</strong> {reservaSeleccionada.unidad.modelo}</p>
                <p><strong>Capacidad:</strong> {reservaSeleccionada.unidad.capacidad}</p>
              </div>
            )}

            {/* 🧾 BOTÓN DE DESCARGA PDF */}
            {reservaSeleccionada.estado === "CONFIRMADA" && (
              <button
                className="descargar-pdf-btn"
                onClick={() => {
                  console.log("🔹 Click en botón Descargar PDF");
                  descargarPdf(reservaSeleccionada.idReserva);
                }}
              >
                Descargar comprobante PDF
              </button>
            )}

            <button className="cerrar-modal-btn" onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MisReservas;
