// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx"; 
import "./index.css"; // estilos globales
import { AuthProvider } from "./context/authContext"; // 👈 importa el AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>   {/* 👈 aquí envolvemos toda la App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
