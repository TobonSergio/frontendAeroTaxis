// Archivo: src/pages/OAuthCallback.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Obtiene el token de los parámetros de la URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token'); 
    
    if (token) {
      // Si hay un token, lo guarda y redirige
      localStorage.setItem('jwtToken', token);
      navigate('/dashboard'); // O la ruta a tu página de inicio
    } else {
      // Si no hay token, hay un error. Redirige al login.
      navigate('/login'); 
    }
  }, [navigate, location]);

  return (
    <div>
      <p>Iniciando sesión con Google...</p>
    </div>
  );
};

export default OAuthCallback;