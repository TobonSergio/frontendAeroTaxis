import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Mensaje from "../components/AsignacionChoferAndUnidad/Mensaje.jsx";
import SeleccionList from "../components/AsignacionChoferAndUnidad/SeleccionList.jsx";
import asignacionService from "../services/asignacionService";
import reservaArchivoService from "../services/reservaArchivoService";

function AsignacionChoferAndUnidad() {
  const { idReserva } = useParams();

  // Estados principales
  const [choferes, setChoferes] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [choferSeleccionado, setChoferSeleccionado] = useState(null);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);
  const [mostrarBotonPdf, setMostrarBotonPdf] = useState(false);

  // Cargar choferes y unidades disponibles
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [dataChoferes, dataUnidades] = await Promise.all([
          asignacionService.listarChoferesDisponibles(),
          asignacionService.listarUnidadesDisponibles(),
        ]);
        setChoferes(dataChoferes);
        setUnidades(dataUnidades);
      } catch (error) {
        console.error(error);
        mostrarMensaje("Error al cargar choferes o unidades.", true);
      }
    };
    cargarDatos();
  }, []);

  // Función para mostrar mensajes
  const mostrarMensaje = (msg, error = false) => {
    setMensaje(msg);
    setEsError(error);
  };

  // Crear la asignación
  const crearAsignacion = async () => {
    if (!choferSeleccionado || !unidadSeleccionada) {
      mostrarMensaje("⚠️ Debes seleccionar un chofer y una unidad.", true);
      return;
    }

    try {
      await asignacionService.crearAsignacion({
        idReserva: Number(idReserva),
        idChofer: Number(choferSeleccionado.idChofer),
        idUnidad: Number(unidadSeleccionada.idUnidad),
      });
      mostrarMensaje("✅ Asignación creada exitosamente.", false);
      setMostrarBotonPdf(true);
    } catch (error) {
      console.error(error);
      mostrarMensaje("❌ Error al crear la asignación.", true);
    }
  };

  // Descargar comprobante PDF
  const descargarPDF = async () => {
    try {
      await reservaArchivoService.descargarPdf(idReserva);
    } catch (error) {
      mostrarMensaje("⚠️ Error al descargar el PDF.", true);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />

      <main className="container py-4">
        <h2 className="text-white mb-4">
          Asignar Chofer y Unidad a la Reserva #{idReserva}
        </h2>

        <Mensaje mensaje={mensaje} esError={esError} />

        <div className="row g-4">
          {/* Lista de Choferes */}
          <div className="col-12 col-lg-6">
            <SeleccionList
              titulo="Choferes Disponibles"
              items={choferes}
              seleccionado={choferSeleccionado}
              onSeleccionar={setChoferSeleccionado}
              tipo="chofer"
            />
          </div>

          {/* Lista de Unidades */}
          <div className="col-12 col-lg-6">
            <SeleccionList
              titulo="Unidades Disponibles"
              items={unidades}
              seleccionado={unidadSeleccionada}
              onSeleccionar={setUnidadSeleccionada}
              tipo="unidad"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-4 d-flex flex-column flex-md-row gap-3">
          <button className="btn btn-success flex-grow-1" onClick={crearAsignacion}>
            Crear Asignación
          </button>

          {mostrarBotonPdf && (
            <button className="btn btn-primary flex-grow-1" onClick={descargarPDF}>
              Descargar Comprobante PDF
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default AsignacionChoferAndUnidad;
