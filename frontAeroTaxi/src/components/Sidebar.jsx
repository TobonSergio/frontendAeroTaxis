import "../styles/styleSidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">AeroTaxi</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">🏠 Inicio</Link></li>
          <li><Link to="/dashboard/reservas">📅 Reservas</Link></li>
          <li><Link to="/dashboard/Profile">👤 Perfil</Link></li> {/* 👈 ruta unificada */}
          <li><Link to="/dashboard/ajustes">⚙️ Ajustes</Link></li>
          <li><Link to="/logout">🚪 Cerrar sesión</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
