import Navbar from "../components/Sidebar.jsx";
import AsignarUnidadChofer from "../components/AsignarUnidadChofer";

function AsignarUnidadAndChofer() {
  return (
    <div className="page-layout">
      <Navbar />

      <main className="main-content">
        <AsignarUnidadChofer />
      </main>
    </div>
  );
}

export default AsignarUnidadAndChofer;
