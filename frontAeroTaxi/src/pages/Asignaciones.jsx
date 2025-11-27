import Navbar from "../components/Navbar.jsx";
import AsignarUnidadChofer from "../components/AsignarUnidadChofer";

function AsignarUnidadAndChofer() {
  return (
    <div className="dashboard">
      <Navbar />

      <main className="main-content">
        <AsignarUnidadChofer />
      </main>
    </div>
  );
}

export default AsignarUnidadAndChofer;
