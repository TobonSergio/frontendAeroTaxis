import React from "react";
import "../../styles/styleResources/cardsAsignacion.css";

function UnidadCard({ unidad, seleccionado, onSeleccionar }) {
  const esSeleccionado = seleccionado?.idUnidad === unidad.idUnidad;

  return (
    <div
      className={`custom-card ${esSeleccionado ? "selected" : ""}`}
      onClick={() => onSeleccionar(unidad)}
    >
      {unidad.fotografia ? (
        <img src={unidad.fotografia} alt="Unidad" />
      ) : (
        <div className="bg-secondary text-center text-white p-4">Sin imagen</div>
      )}

      <div className="card-body">
        <h5 className="card-title">Unidad #{unidad.idUnidad}</h5>
        <p className="card-text"><strong>Placa:</strong> {unidad.placa}</p>
        <p className="card-text"><strong>Serie:</strong> {unidad.serie}</p>
        <p className="card-text"><strong>Tipo:</strong> {unidad.tipo}</p>
        <button
          className={`btn btn-${esSeleccionado ? "light" : "outline-light"} btn-select`}
          onClick={() => onSeleccionar(unidad)}
        >
          {esSeleccionado ? "Seleccionada" : "Seleccionar Unidad"}
        </button>
      </div>
    </div>
  );
}

export default UnidadCard;
