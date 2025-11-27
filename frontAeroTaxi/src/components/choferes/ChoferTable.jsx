import React from "react";
import ActionButtons from "../ActionButtons.jsx";

function ChoferTable({ choferes, onEdit, onDelete }) {
  return (
    <section className="mt-4">
      <h2 className="mb-3">Listado de Choferes</h2>

      {/* Contenedor responsive para móviles */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-dark table-striped table-hover table-bordered align-middle mb-0">
          <thead className="table-primary text-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Licencia</th>
              <th>Bilingüe</th>
              <th>Estado</th>
              <th>Rol</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {choferes.length > 0 ? (
              choferes.map((c) => (
                <tr key={c.idChofer}>
                  <td>{c.idChofer}</td>
                  <td>{c.nombre} {c.apellido}</td>
                  <td>{c.correo}</td>
                  <td>{c.telefono}</td>
                  <td>{c.licenciaConduccion}</td>
                  <td>
                    <span className={`badge ${c.bilingue ? "bg-success" : "bg-secondary"}`}>
                      {c.bilingue ? "Sí" : "No"}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">{c.estado}</span>
                  </td>
                  <td>{c.rolNombre}</td>

                  <td className="text-center">
                    <ActionButtons
                      onEdit={() => onEdit(c)}
                      onDelete={() => onDelete(c.idChofer)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-3">
                  No hay choferes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ChoferTable;
