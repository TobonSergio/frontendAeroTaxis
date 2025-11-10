import Navbar from "../components/Sidebar";
import ManageRutas from "../components/ManageRutas";

function Rutas() {
  return (
    <div className="page-layout">
      <Navbar /> {/* Navbar arriba */}

      <main className="">
        <ManageRutas />
      </main>
    </div>
  );
}

export default Rutas;
