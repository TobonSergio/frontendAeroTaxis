import Navbar from "../components/Navbar";
import ManageRutas from "../components/ManageRutas";

function Rutas() {
  return (
    <div className="dashboard">
      <Navbar /> {/* Navbar arriba */}

      <main className="">
        <ManageRutas />
      </main>
    </div>
  );
}

export default Rutas;
