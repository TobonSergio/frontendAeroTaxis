import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import asignacionService from "../services/asignacionService.js";

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
    <div className="container py-4">
      <h2 className="mb-4 text-center text-md-start text-white">Reservas Pendientes</h2>

      {mensaje && (
        <div className="alert alert-warning" role="alert">
          {mensaje}
        </div>
      )}

      {reservasPendientes.length === 0 && (
        <div className="alert alert-info text-center">
          No hay reservas pendientes.
        </div>
      )}

      <div className="row g-3">
        {reservasPendientes.map((reserva) => (
          <div key={reserva.idReserva} className="col-12 col-md-6 col-lg-4">
            <div className="card bg-dark text-white border-secondary shadow-sm h-100">
              <div className="card-body text-warning">
                <h5 className="card-title">Reserva #{reserva.idReserva}</h5>
                <p className="card-text mb-1 text-white">
                  <strong>Cliente:</strong> {reserva.nombreCliente} {reserva.apellidoCliente}
                </p>
                <p className="card-text mb-1 text-white">
                  <strong>Teléfono:</strong> {reserva.telefonoCliente}
                </p>
                <p className="card-text mb-1 text-white">
                  <strong>Ciudad:</strong> {reserva.ciudadCliente}
                </p>
                <p className="card-text mb-1 text-white">
                  <strong>Origen:</strong> {reserva.origen}
                </p>
                <p className="card-text mb-1 text-white">
                  <strong>Destino:</strong> {reserva.destino}
                </p>
                <p className="card-text mb-3 text-white">
                  <strong>Fecha:</strong> {new Date(reserva.fechaReserva).toLocaleString()}
                </p>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => irAsignacionCompleta(reserva.idReserva)}
                >
                  Asignar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AsignarUnidadChofer;
