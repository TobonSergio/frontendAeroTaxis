import Navbar from "../components/Navbar";
import ManageUnidades from "../components/ManageUnidades";

function Unidades() {
  return (
    <div className="dashboard">
      <Navbar /> {/* Navbar arriba */}

      <main className="">
        <ManageUnidades />
      </main>
    </div>
  );
}

export default Unidades;
