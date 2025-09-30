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
import OAuthCallback from "./pages/OAuthCallback"; 
import Verify from "./pages/Verify"; 

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

        {/* Rutas privadas */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
