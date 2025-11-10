import Navbar from "../components/Sidebar";
import ManageUnidades from "../components/ManageUnidades";

function Unidades() {
  return (
    <div className="page-layout">
      <Navbar /> {/* Navbar arriba */}

      <main className="">
        <ManageUnidades />
      </main>
    </div>
  );
}

export default Unidades;
