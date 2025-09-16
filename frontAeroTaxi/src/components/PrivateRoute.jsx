// 📌 components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const token = localStorage.getItem("token"); // revisa si existe token

  // Si hay token, deja pasar (renderiza las rutas hijas con <Outlet />)
  // Si no hay token, redirige al login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
