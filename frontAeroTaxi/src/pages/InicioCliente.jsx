import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function InicioCliente() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      {/* 🚀 Navbar agregado */}
      <Navbar />

      <main className="main-content">
        <div className="container text-center mt-5">
          <div className="p-4 bg-dark text-white rounded shadow-sm">
            <h2 className="mb-3">¡Bienvenido al Sistema de Reservas!</h2>

            <h4 className="text-primary mb-4">
              {user?.nombreCompleto || user?.email || "Cliente"}
            </h4>

            <p className="mb-4">
              Desde aquí podrás gestionar tus reservas de taxi de forma rápida y sencilla.
            </p>

            {/* 🔥 Ruta correcta hacia Mis Reservas / Crear Reserva */}
            <Link
              to="/dashboard/reserva-cliente"
              className="btn btn-danger btn-lg"
            >
              🚕 Reservar Taxi Ahora
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InicioCliente;
