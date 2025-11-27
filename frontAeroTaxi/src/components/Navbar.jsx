import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo-taxis-rojos-aero-2.jpeg";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
          <img
            src={logo}
            alt="AeroTaxi Logo"
            style={{ width: "45px", height: "45px", borderRadius: "6px" }}
          />
          <span className="ms-2">AeroTaxi</span>
        </Link>

        {/* BOTÓN TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav me-auto">

            <Link className="nav-link" to="/dashboard">Inicio</Link>

            {user.rolid === 3 && (
              <Link className="nav-link" to="/dashboard/reserva-cliente">
                Mis Reservas
              </Link>
            )}

            {(user.rolid === 1 || user.rolid === 2) && (
              <Link className="nav-link" to="/dashboard/reservas">
                Reservas
              </Link>
            )}

            <Link className="nav-link" to="/dashboard/historial">Historial</Link>

            {(user.rolid === 1 || user.rolid === 2) && (
              <>
                <Link className="nav-link" to="/dashboard/unidades">Unidades</Link>
                <Link className="nav-link" to="/dashboard/choferes">Choferes</Link>
                <Link className="nav-link" to="/dashboard/rutas">Rutas</Link>
                <Link className="nav-link" to="/dashboard/asignaciones">Asignaciones</Link>
              </>
            )}

            {user.rolid === 1 && (
              <Link className="nav-link" to="/dashboard/users">Usuarios</Link>
            )}

            {/* PERFIL */}
            {user.rolid === 3 && (
              <Link className="nav-link" to="/dashboard/cliente/perfil">Mi Perfil</Link>
            )}
            {user.rolid === 1 && (
              <Link className="nav-link" to="/dashboard/profile">Mi Perfil</Link>
            )}
            {user.rolid === 2 && (
              <Link className="nav-link" to="/dashboard/staff/profile">Mi Perfil</Link>
            )}
            {user.rolid === 4 && (
              <Link className="nav-link" to="/dashboard/chofer/perfil">Mi Perfil</Link>
            )}
          </div>

          {/* BOTÓN DE LOGOUT */}
          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleLogout}
          >
            <FiLogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
