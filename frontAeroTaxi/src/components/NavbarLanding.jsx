import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-taxis-rojos-aero-2.jpeg";
import "../styles/styleLogo.css";
import "../styles/styleNavbarLanding.css";

function NavbarLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar-landing">
      {/* Logo */}
      <Link to={{ pathname: "/", hash: "#hero" }} className="logo-link">
        <img className="style-logo" src={logo} alt="Logo Aero Taxis" />
      </Link>

      {/* Botón hamburguesa */}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Contenedor de links */}
      <div className="div-navbar-links-landing">
        <ul className={`navbar-links-landing ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to={{ pathname: "/", hash: "#hero" }} onClick={toggleMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "/", hash: "#services" }}
              onClick={toggleMenu}
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "/", hash: "#about-us" }}
              onClick={toggleMenu}
            >
              Sobre nosotros
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleMenu}>
              <button className="btn-inciar-sesion">Iniciar Sesión</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarLanding;
