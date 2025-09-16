import "../styles/styleDashboard.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar reutilizable */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Bienvenido al Dashboard ✈️</h1>
          <p>Gestiona tus reservas, perfil y más desde aquí.</p>
        </header>

        {/* Cards con info rápida */}
        <section className="cards">
          <div className="card">
            <h3>Reservas activas</h3>
            <p>3</p>
          </div>
          <div className="card">
            <h3>Viajes completados</h3>
            <p>12</p>
          </div>
          <div className="card">
            <h3>Notificaciones</h3>
            <p>5</p>
          </div>
        </section>

        {/* Tabla de ejemplo */}
        <section className="table-section">
          <h2>Últimas Reservas</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Destino</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Bogotá</td>
                <td>2025-09-12</td>
                <td><span className="status status-active">Activa</span></td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Medellín</td>
                <td>2025-09-08</td>
                <td><span className="status status-completed">Completada</span></td>
              </tr>
              <tr>
                <td>#003</td>
                <td>Cali</td>
                <td>2025-08-30</td>
                <td><span className="status status-cancelled">Cancelada</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
