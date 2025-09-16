// src/pages/OAuthCallback.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token'); 
    
    if (token) {
      localStorage.setItem('token', token); // ✅ nombre correcto
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate, location]);

  return <p>Iniciando sesión con Google...</p>;
};

export default OAuthCallback;
