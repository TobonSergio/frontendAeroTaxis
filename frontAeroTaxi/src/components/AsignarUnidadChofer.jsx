import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import asignacionService from "../services/asignacionService.js";
import "../styles/styleAsignaciones.css";

function AsignarUnidadChofer() {
  const [reservasPendientes, setReservasPendientes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPendientes = async () => {
      try {
        const pendientes = await asignacionService.listarReservasPendientes();
        setReservasPendientes(pendientes);
      } catch (error) {
        console.error("❌ Error al obtener reservas pendientes:", error);
        setMensaje("No se pudieron cargar las reservas pendientes.");
      }
    };
    cargarPendientes();
  }, []);

  const irAsignacionCompleta = (idReserva) => {
    navigate(`/dashboard/asignaciones/asignar/${idReserva}`);
  };

  return (
    <div className="container">
      {/* 🏷️ Título principal */}
      <h2 className="h2-reservas-pendientes">Reservas Pendientes</h2>

      {/* 💬 Mensaje general */}
      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* 🧩 Contenedor de tarjetas */}
      <div className="cards-container">
        {/* ⚠️ Mensaje si no hay reservas */}
        {reservasPendientes.length === 0 && (
          <p
            className="mensaje"
            style={{
              backgroundColor: "#ffffff",
              color: "#4a5568",
              width: "100%",
            }}
          >
            No hay reservas pendientes.
          </p>
        )}

        {/* 🪩 Listado de reservas pendientes */}
        {reservasPendientes.map((reserva) => (
          <div key={reserva.idReserva} className="card card-asignacion">
            <p>
              <strong>ID:</strong> {reserva.idReserva}
            </p>
            <p>
              <strong>Cliente:</strong> {reserva.nombreCliente}{" "}
              {reserva.apellidoCliente}
            </p>
            <p>
              <strong>Teléfono:</strong> {reserva.telefonoCliente}
            </p>
            <p>
              <strong>Ciudad:</strong> {reserva.ciudadCliente}
            </p>
            <p>
              <strong>Origen:</strong> {reserva.origen}
            </p>
            <p>
              <strong>Destino:</strong> {reserva.destino}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(reserva.fechaReserva).toLocaleString()}
            </p>

            {/* 🔘 Botón de asignación */}
            <button
              className="button-asignar"
              onClick={() => irAsignacionCompleta(reserva.idReserva)}
            >
              Asignar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AsignarUnidadChofer;
