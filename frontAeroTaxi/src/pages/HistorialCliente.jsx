import React from "react";
import HistorialCliente from "../components/Historial/HistorialCliente.jsx";
import Navbar from "../components/Navbar.jsx";

function HistorialClientePage() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4">Mi Historial de Reservas</h1>

        {/* Render del componente real */}
        <HistorialCliente />
      </div>
    </>
  );
}

export default HistorialClientePage;
