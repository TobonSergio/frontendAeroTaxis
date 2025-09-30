import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    // 👉 Borras el token (o lo que uses para guardar sesión)
    localStorage.removeItem("token");

    // 👉 Rediriges al login reemplazando el historial
    window.location.replace("/login");
  };

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
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">🏠 Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/reservations">📅 Reservas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/profile">👤 Perfil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/users">👤 Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/ajustes">⚙️ Ajustes</Link>
            </li>

            {/* 🚪 Cerrar sesión */}
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
