import React from "react";

function Mensaje({ mensaje, esError }) {
  if (!mensaje) return null;

  return (
    <div className={`alert mt-3 ${esError ? "alert-danger" : "alert-success"}`} role="alert">
      {mensaje}
    </div>
  );
}

export default Mensaje;
