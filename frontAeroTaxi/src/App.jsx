// App.jsx
import { Routes, Route } from "react-router-dom";
import ScrollToHashElement from "./components/ScrollToHashElement";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OAuthCallback from './pages/OAuthCallback'; 
import Verify from "./pages/Verify"; // 

function App() {
  return (
    <>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify" element={<Verify />} /> {/* 👈 nueva ruta */}
      </Routes>
    </>
  );
}

export default App;
