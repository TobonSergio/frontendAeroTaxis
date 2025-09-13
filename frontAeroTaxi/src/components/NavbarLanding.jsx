import { Link } from "react-router-dom";
import logo from "../assets/logo-taxis-rojos-aero-2.jpeg";
import "../styles/styleLogo.css";
import "../styles/styleNavbarLanding.css";

function NavbarLanding() {
  return (
    <nav className="navbar-landing">
      {/* Logo que redirige a la sección Inicio del landing */}
      <Link to={{ pathname: "/", hash: "#hero" }} className="logo-link">
        <img className="style-logo" src={logo} alt="Logo Aero Taxis" />
      </Link>

      <div className="div-navbar-links-landing">
        <ul className="navbar-links-landing">
          {/* Navegación hacia secciones en Landing */}
          <li>
            <Link to={{ pathname: "/", hash: "#hero" }}>Inicio</Link>
          </li>
          <li>
            <Link to={{ pathname: "/", hash: "#services" }}>Servicios</Link>
          </li>
          <li>
            <Link to={{ pathname: "/", hash: "#about-us" }}>Sobre nosotros</Link>
          </li>

          {/* Navegación hacia Login */}
          <li>
            <Link to="/login">
              <button className="btn-inciar-sesion">Iniciar Sesión</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarLanding;
