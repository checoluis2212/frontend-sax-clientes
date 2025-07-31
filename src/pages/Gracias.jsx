// src/pages/Gracias.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Gracias() {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('pagado') === 'true') {
      localStorage.removeItem('solicitudPendiente');
    }
  }, [location]);

  return (
    <>
      {/* Header igual al de Intro */}
      <header className="bg-white shadow-sm py-3 mb-5">
        <div className="container d-flex justify-content-between align-items-center">
          <img src="/sax.png" alt="SAX Services" height="130" />
          <h6 className="mb-0 text-secondary">Estudios Socioeconómicos</h6>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container text-center">
        <div className="card shadow-lg border-0 rounded-3 p-4 mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.03l-2.47-2.47a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.08-.02l6-7a.75.75 0 0 0-1.14-.98L6.97 10.03z"/>
              </svg>
            </div>
            <h2 className="fw-bold text-success">¡Pago exitoso!</h2>
            <p className="mt-3 fs-5">
              Gracias por tu compra. Hemos recibido tu pago y comenzaremos el estudio socioeconómico.
            </p>
            <p className="text-muted">
              Te contactaremos al correo o teléfono proporcionado si es necesario más información.
            </p>
            <a href="/" className="btn btn-primary btn-lg mt-3">
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
