import React from "react";
import ActionButtons from "../ActionButtons.jsx";

function RutasTable({ rutas, onEdit, onDelete }) {
  return (
    <section className="mt-4">
      <h2 className="mb-3">Listado de Rutas</h2>

      {/* Contenedor responsive */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-dark table-striped table-hover table-bordered align-middle mb-0">
          <thead className="table-primary text-dark">
            <tr>
              <th>ID</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Precio</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {rutas.length > 0 ? (
              rutas.map((r) => (
                <tr key={r.idRuta}>
                  <td>{r.idRuta}</td>
                  <td>{r.inicio}</td>
                  <td>{r.fin}</td>
                  <td>
                    <span className="badge bg-success">
                      ${Number(r.precio).toLocaleString()}
                    </span>
                  </td>

                  <td className="text-center">
                    <ActionButtons
                      onEdit={() => onEdit(r)}
                      onDelete={() => onDelete(r.idRuta)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3">
                  No hay rutas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RutasTable;
