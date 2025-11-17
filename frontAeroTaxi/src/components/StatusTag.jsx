import React from "react";
import "../styles/styleResources/styleStatusTag.css";

function StatusTag({ estado }) {
  const estadoClass = {
    // Reservas
    PENDIENTE: "estado-pendiente",
    CONFIRMADA: "estado-confirmada",
    CANCELADA: "estado-cancelada",

    // Unidades
    DISPONIBLE: "estado-disponible",
    OCUPADA: "estado-ocupada",
    MANTENIMIENTO: "estado-mantenimiento",

    // Default
  }[estado] || "estado-default";

  return <span className={`estado-tag ${estadoClass}`}>{estado}</span>;
}

export default StatusTag;

