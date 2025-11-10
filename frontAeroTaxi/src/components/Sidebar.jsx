// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/dashboard">
          AeroTaxi
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* 🔹 Inicio */}
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">🏠 Inicio</Link>
            </li>

            {/* 🔹 Reservas (depende del rol) */}
            {user && (
              <li className="nav-item">
                {user.rolid === 3 ? (
                  <Link className="nav-link" to="/dashboard/reserva-cliente">📅 Mis Reservas</Link>
                ) : (
                  <Link className="nav-link" to="/dashboard/reservas">📅 Reservas</Link>
                )}
              </li>
            )}

            {/* 🔹 Historial (visible para todos) */}
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/historial">🧾 Historial</Link>
            </li>

            {/* 🔹 Unidades (solo para rol 1 o 2) */}
            {(user.rolid === 1 || user.rolid === 2) && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/unidades">🚗 Unidades</Link>
              </li>
            )}

            {/* 🔹 Rutas (solo para rol 1 o 2) */}
            {(user.rolid === 1 || user.rolid === 2) && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/rutas">🗺️ Rutas</Link>
              </li>
            )}

            {/* 🔹 Asignaciones (solo para rol 1 o 2) */}
            {(user.rolid === 1 || user.rolid === 2) && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/asignaciones">📋 Asignaciones</Link>
              </li>
            )}

            {/* 🔹 Usuarios (solo admin) */}
            {user.rolid === 1 && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/users">👥 Usuarios</Link>
              </li>
            )}

            {/* 🔹 Perfil según rol */}
            <li className="nav-item">
              {user.rolid === 3 && (
                <Link className="nav-link" to="/dashboard/cliente/perfil">👤 Mi Perfil</Link>
              )}
              {user.rolid === 1 && (
                <Link className="nav-link" to="/dashboard/profile">👤 Mi Perfil</Link>
              )}
              {user.rolid === 2 && (
                <Link className="nav-link" to="/dashboard/staff/profile">👤 Mi Perfil</Link>
              )}
              {user.rolid === 4 && (
                <Link className="nav-link" to="/dashboard/chofer/perfil">👤 Mi Perfil</Link>
              )}
            </li>

            {/* 🔹 Cerrar sesión */}
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                style={{ textDecoration: "none" }}
                onClick={handleLogout}
              >
                🚪 Cerrar sesión
              </button>
            </li>
          </ul>

          {/* Buscador */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
