import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import asignacionService from "../services/asignacionService";
import reservaArchivoService from "../services/reservaArchivoService"; // 🧾 Importamos tu servicio existente
import Navbar from "../components/Sidebar.jsx";
import "../styles/styleAsignarUnidadAndChofer.css";

function AsignacionChoferAndUnidad() {
  const { idReserva } = useParams();
  const navigate = useNavigate();

  const [choferes, setChoferes] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [choferSeleccionado, setChoferSeleccionado] = useState(null);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);
  const [mostrarBotonPdf, setMostrarBotonPdf] = useState(false); // 🧾 Nuevo estado

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
        console.error("❌ Error al cargar datos:", error);
        setMensaje("Error al cargar choferes o unidades.");
        setEsError(true);
      }
    };
    cargarDatos();
  }, []);

  const seleccionarChofer = (chofer) => {
    setChoferSeleccionado(chofer);
    setMensaje(`✅ Chofer ${chofer.nombre} ${chofer.apellido} seleccionado.`);
    setEsError(false);
  };

  const seleccionarUnidad = (unidad) => {
    setUnidadSeleccionada(unidad);
    setMensaje(`✅ Unidad ${unidad.placa} seleccionada.`);
    setEsError(false);
  };

  const crearAsignacion = async () => {
    if (!choferSeleccionado || !unidadSeleccionada) {
      setMensaje("⚠️ Debes seleccionar un chofer y una unidad antes de continuar.");
      setEsError(true);
      return;
    }

    try {
      await asignacionService.crearAsignacion({
        idReserva: parseInt(idReserva),
        idChofer: parseInt(choferSeleccionado.idChofer),
        idUnidad: parseInt(unidadSeleccionada.idUnidad),
      });

      setMensaje("✅ Asignación creada exitosamente.");
      setEsError(false);
      setMostrarBotonPdf(true); // 🧾 Mostramos el botón de descarga

    } catch (error) {
      console.error("❌ Error al crear la asignación:", error);
      setMensaje("❌ Error al crear la asignación.");
      setEsError(true);
    }
  };

  // 🧾 Descargar PDF usando el servicio que ya tienes
  const descargarPDF = async () => {
    try {
      await reservaArchivoService.descargarPdf(idReserva);
    } catch (error) {
      setMensaje("⚠️ Error al descargar el PDF.");
      setEsError(true);
    }
  };

  const getMensajeClass = () => {
    if (!mensaje) return "";
    return esError ? "asig-mensaje asig-error" : "asig-mensaje asig-success";
  };

  return (
    <div className="page-layout">
      <Navbar />

      <main className="asig-container">
        <h2 className="asig-titulo">
          Asignar Chofer y Unidad a la Reserva #{idReserva}
        </h2>

        {mensaje && <p className={getMensajeClass()}>{mensaje}</p>}

        <div className="asig-grid">
          {/* Choferes */}
          <div className="asig-seccion">
            <h3 className="asig-subtitulo">Choferes Disponibles</h3>
            <div className="asig-cards">
              {choferes.length === 0 ? (
                <p className="asig-mensaje">No hay choferes disponibles.</p>
              ) : (
                choferes.map((chofer) => (
                  <div
                    key={chofer.idChofer}
                    className={`asig-card ${
                      choferSeleccionado?.idChofer === chofer.idChofer
                        ? "asig-seleccionado"
                        : ""
                    }`}
                  >
                    <p><strong>Nombre:</strong> {chofer.nombre} {chofer.apellido}</p>
                    <p><strong>Correo:</strong> {chofer.correo}</p>
                    <p><strong>Teléfono:</strong> {chofer.telefono}</p>
                    <p><strong>Licencia:</strong> {chofer.licenciaConduccion}</p>
                    <button
                      className="asig-btn"
                      onClick={() => seleccionarChofer(chofer)}
                    >
                      Seleccionar Chofer
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Unidades */}
          <div className="asig-seccion">
            <h3 className="asig-subtitulo">Unidades Disponibles</h3>
            <div className="asig-cards">
              {unidades.length === 0 ? (
                <p className="asig-mensaje">No hay unidades disponibles.</p>
              ) : (
                unidades.map((unidad) => (
                  <div
                    key={unidad.idUnidad}
                    className={`asig-card ${
                      unidadSeleccionada?.idUnidad === unidad.idUnidad
                        ? "asig-seleccionado"
                        : ""
                    }`}
                  >
                    {unidad.fotografia ? (
                      <img src={unidad.fotografia} alt="Unidad" className="asig-img" />
                    ) : (
                      <div className="asig-placeholder">Sin imagen</div>
                    )}
                    <p><strong>Placa:</strong> {unidad.placa}</p>
                    <p><strong>Serie:</strong> {unidad.serie}</p>
                    <p><strong>Tipo:</strong> {unidad.tipo}</p>
                    <button
                      className="asig-btn"
                      onClick={() => seleccionarUnidad(unidad)}
                    >
                      Seleccionar Unidad
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="asig-final">
          <button className="asig-btn-final" onClick={crearAsignacion}>
            Crear Asignación
          </button>

          {/* 🧾 Mostrar el botón de descarga solo después de crear la asignación */}
          {mostrarBotonPdf && (
            <button className="asig-btn-final descargar" onClick={descargarPDF}>
              Descargar Comprobante PDF
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default AsignacionChoferAndUnidad;
