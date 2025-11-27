import React from "react";
import ActionButtons from "../ActionButtons.jsx";
import StatusTag from "../StatusTag.jsx";

function UnidadTable({ unidades, onEdit, onDelete }) {
  return (
    <section className="mt-4">
      <h2 className="mb-3">Listado de Unidades</h2>

      {/* Contenedor responsive igual al de Choferes */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-dark table-striped table-hover table-bordered align-middle mb-0">
          
          {/* Encabezado igual al de Choferes */}
          <thead className="table-primary text-dark">
            <tr>
              <th>ID</th>
              <th>Placa</th>
              <th>Serie</th>
              <th>Fotografía</th>
              <th>Tipo Taxi</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {unidades.length > 0 ? (
              unidades.map((u) => (
                <tr key={u.idUnidad}>
                  <td>{u.idUnidad}</td>
                  <td>{u.placa}</td>
                  <td>{u.serie}</td>

                  <td>
                    {u.fotografia ? (
                      <img
                        src={u.fotografia}
                        alt="Foto unidad"
                        className="img-fluid rounded"
                        style={{
                          width: "70px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span className="text-secondary">Sin foto</span>
                    )}
                  </td>

                  <td>{u.tipoTaxi}</td>

                  <td>
                    <StatusTag estado={u.estado} />
                  </td>

                  <td className="text-center">
                    <ActionButtons
                      onEdit={() => onEdit(u)}
                      onDelete={() => onDelete(u.idUnidad)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No hay unidades registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UnidadTable;
