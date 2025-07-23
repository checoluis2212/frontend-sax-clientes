import React from 'react';
import { useLocation } from 'react-router-dom';

const Gracias = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');

  return (
    <div className="container text-center py-5">
      <h2 className="mb-4 text-success fw-bold">✅ ¡Gracias por tu solicitud!</h2>
      <p className="mb-3">Hemos recibido tu estudio socioeconómico.</p>
      {sessionId && (
        <p className="text-muted small">ID de sesión: <code>{sessionId}</code></p>
      )}
    </div>
  );
};

export default Gracias;
