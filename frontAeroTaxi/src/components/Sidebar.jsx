// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/styleNavbar.css";
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
   <nav className="navbar-custom">
  <div className="navbar-container">
    <div className="navbar-left">
      <Link className="navbar-logo" to="/dashboard">
        <img src={logo} alt="AeroTaxi Logo" className="navbar-logo-img" />
      </Link>

      <ul className="navbar-links">
        <li><Link to="/dashboard">Inicio</Link></li>

        {user && (
          <li>
            {user.rolid === 3 ? (
              <Link to="/dashboard/reserva-cliente">Mis Reservas</Link>
            ) : (
              <Link to="/dashboard/reservas">Reservas</Link>
            )}
          </li>
        )}

        <li><Link to="/dashboard/historial">Historial</Link></li>

        {(user.rolid === 1 || user.rolid === 2) && (
          <>
            <li><Link to="/dashboard/unidades">Unidades</Link></li>
            <li><Link to="/dashboard/choferes">Choferes</Link></li>
            <li><Link to="/dashboard/rutas">Rutas</Link></li>
            <li><Link to="/dashboard/asignaciones">Asignaciones</Link></li>
          </>
        )}

        {user.rolid === 1 && (
          <li><Link to="/dashboard/users">Usuarios</Link></li>
        )}

        <li>
          {user.rolid === 3 && <Link to="/dashboard/cliente/perfil">Mi Perfil</Link>}
          {user.rolid === 1 && <Link to="/dashboard/profile">Mi Perfil</Link>}
          {user.rolid === 2 && <Link to="/dashboard/staff/profile">Mi Perfil</Link>}
          {user.rolid === 4 && <Link to="/dashboard/chofer/perfil">Mi Perfil</Link>}
        </li>
      </ul>
    </div>

    <div className="navbar-right">
      <form className="navbar-search">
        <input type="search" placeholder="Buscar..." />
      </form>
      <button className="btn-logout" onClick={handleLogout} title="Cerrar sesión">
  <FiLogOut size={22} />
</button>

    </div>
  </div>
</nav>
  );
}

export default Navbar;
