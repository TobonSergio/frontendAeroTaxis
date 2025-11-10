import { Routes, Route } from "react-router-dom";
import ScrollToHashElement from "./components/ScrollToHashElement";
import PrivateRoute from "./components/PrivateRoute"; // 👈 importa el guardia
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Users from "./pages/Users.jsx";
import Reservations from "./pages/Reservations.jsx";
import Unidades from "./pages/Unidades.jsx";
import OAuthCallback from "./pages/OAuthCallback"; 
import Verify from "./pages/Verify"; 
import ClienteProfile from "./pages/ClienteProfile.jsx";
import ChoferProfile from "./pages/ChoferProfile.jsx";
import Rutas from "./pages/Rutas.jsx"; // 👈 importa tu ManageRutas
import ReservaCliente from "./pages/ReservaCliente.jsx";
import AsignarUnidadChofer from "./pages/Asignaciones.jsx";
import AsignacionChoferAndUnidad from "./pages/AsignacionChoferAndUnidad.jsx";
import MisReservas from "./pages/MisReservas.jsx";


 // 👈 importa el componente

function App() {
  return (
    <>
      <ScrollToHashElement />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/verify" element={<Verify />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="unidades" element={<Unidades />} />
          <Route path="cliente/perfil" element={<ClienteProfile />} />
          <Route path="chofer/perfil" element={<ChoferProfile />} /> {/* Perfil de chofer */}
          <Route path="rutas" element={<Rutas />} />
          <Route path="reserva-cliente" element ={<MisReservas/>} />
          <Route path="asignaciones" element ={<AsignarUnidadChofer/>} />
            {/* 🔹 Nueva ruta para asignar chofer y unidad */}
          <Route path="asignaciones/asignar/:idReserva" element={<AsignacionChoferAndUnidad />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
