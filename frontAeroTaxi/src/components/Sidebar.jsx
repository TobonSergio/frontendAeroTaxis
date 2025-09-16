import { Link } from "react-router-dom";
import "../styles/styleSidebar.css";

function Navbar() {
  const handleLogout = () => {
    // 👉 Borras el token (o la info de sesión que uses)
    localStorage.removeItem("token");

    // 👉 Rediriges al login reemplazando el historial completo
    window.location.replace("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/dashboard">
          AeroTaxi
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">🏠 Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/reservas">📅 Reservas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/profile">👤 Perfil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/ajustes">⚙️ Ajustes</Link>
            </li>

            {/* 🚪 Botón cerrar sesión */}
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={handleLogout}
              >
                🚪 Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
