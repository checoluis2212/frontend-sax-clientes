// src/pages/Gracias.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Gracias() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('pagado') === 'true') {
      localStorage.removeItem('solicitudPendiente'); // limpiar datos
    }

    // Opcional: limpiar parámetro de URL después de 2 segundos
    setTimeout(() => navigate('/gracias', { replace: true }), 2000);
  }, [location, navigate]);

  return (
    <div className="container text-center py-5">
      <h2 className="fw-bold text-success">✅ Pago exitoso</h2>
      <p className="mt-3">Gracias por tu compra. Hemos recibido tu pago y comenzaremos el estudio.</p>
      <a href="https://clientes.saxmexico.com" className="btn btn-primary mt-4">
        Volver al inicio
      </a>
    </div>
  );
}
