import React from "react";
import "../../styles/styleResources/cardsAsignacion.css";

function ChoferCard({ chofer, seleccionado, onSeleccionar }) {
  const esSeleccionado = seleccionado?.idChofer === chofer.idChofer;

  return (
    <div
      className={`custom-card ${esSeleccionado ? "selected" : ""}`}
      onClick={() => onSeleccionar(chofer)}
    >
      <div className="card-body">
        <h5 className="card-title">{chofer.nombre} {chofer.apellido}</h5>
        <p className="card-text"><strong>Correo:</strong> {chofer.correo}</p>
        <p className="card-text"><strong>Teléfono:</strong> {chofer.telefono}</p>
        <p className="card-text"><strong>Licencia:</strong> {chofer.licenciaConduccion}</p>
        <button
          className={`btn btn-${esSeleccionado ? "light" : "outline-light"} btn-select`}
          onClick={() => onSeleccionar(chofer)}
        >
          {esSeleccionado ? "Seleccionado" : "Seleccionar"}
        </button>
      </div>
    </div>
  );
}

export default ChoferCard;
