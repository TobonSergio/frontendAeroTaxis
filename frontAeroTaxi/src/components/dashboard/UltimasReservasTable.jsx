import StatusTag from "../StatusTag.jsx";

function UltimasReservasTable({ reservas }) {
  return (
    <div className="mt-4">

      {/* Barra horizontal entre título y acciones */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0 text-light">Últimas Reservas</h2>

        {/* Si luego quieres agregar un botón aquí */}
        {/* <button className="btn btn-primary">Ver todas</button> */}
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover align-middle">

          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Destino</th>
              <th>Fecha de Reserva</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {reservas.length > 0 ? (
              reservas.map((reserva) => (
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
                <td colSpan="5" className="text-center text-light">
                  No hay reservas registradas.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default UltimasReservasTable;
