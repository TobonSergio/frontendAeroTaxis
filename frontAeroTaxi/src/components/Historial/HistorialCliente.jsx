import { useEffect, useState } from "react";
import historialService from "../../services/historialService.js";
import { useAuth } from "../../hooks/useAuth.js";

function HistorialCliente() {
  const { user } = useAuth();
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  if (user?.rolnombre === "CLIENTE" && user?.idPerfil) {
    cargarHistorial();
  }
}, [user]);


  const cargarHistorial = async () => {
    try {
      setLoading(true);
      const data = await historialService.getHistorialByCliente(user.idPerfil);
      setHistorial(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar el historial.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-3">Cargando historial...</p>;
  if (error) return <p className="text-center text-danger mt-3">{error}</p>;

  return (
    <div className="container mt-4">

      {historial.length === 0 ? (
        <p className="text-center">No tienes reservas anteriores.</p>
      ) : (
        <div className="row">
          {historial.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item.idReserva}>
              <div className="card shadow-sm bg-dark">
                <div className="card-body bg-dark">
                  <h5 className="card-title text-warning">Reserva #{item.idReserva}</h5>

                  <p className="card-text text-white"><strong>📍 Recogida:</strong> {item.lugarRecogida}</p>
                  <p className="card-text text-white"><strong>🎯 Destino:</strong> {item.destino}</p>

                  <p className="card-text text-white">
                    <strong>🕒 Fecha:</strong>{" "}
                    {item.fechaReserva?.split("T")[0]} — {item.horaReserva}
                  </p>

                  <p className="card-text text-white"><strong>🚖 Chofer:</strong> {item.choferNombreCompleto}</p>
                  <p className="card-text text-white"><strong>📞 Teléfono Chofer:</strong> {item.choferTelefono}</p>

                  <p className="card-text text-white"><strong>🚗 Unidad:</strong> {item.placa} ({item.tipoTaxi})</p>

                  <p className="card-text text-white">
                    <strong>📌 Estado Reserva:</strong> {item.estadoReserva}
                  </p>

                  <p className="card-text text-white">
                    <strong>📌 Estado Asignación:</strong> {item.estadoAsignacion}
                  </p>

                  {item.pdfAsignacion && (
                    <a
                      href={`data:application/pdf;base64,${item.pdfAsignacion}`}
                      target="_blank"
                      className="btn btn-primary btn-sm w-100 mt-2"
                    >
                      Ver comprobante PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistorialCliente;
