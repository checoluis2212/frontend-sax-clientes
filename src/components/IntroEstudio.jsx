// src/components/IntroEstudio.jsx
import React from 'react';

export default function IntroEstudio({ onStart }) {
  return (
    <div className="container py-5">
      <div className="row flex-column-reverse flex-md-row">
        {/* IZQUIERDA */}
        <div className="col-md-6 mb-4">
          <h1 className="display-4 fw-bold">
            Solicita un estudio<br/>socioeconómico al instante
          </h1>
          <p className="mt-4">
            Estándar $500 MXN | Urgente $800 MXN
          </p>
          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={onStart}
          >
            Empezar ahora
          </button>
        </div>

        {/* DERECHA */}
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item mb-3">
              <h5 className="mb-1">Paso 1: Tus datos personales</h5>
              <small>Nombre, apellido, empresa, teléfono y email.</small>
            </li>
            <li className="list-group-item mb-3">
              <h5 className="mb-1">Paso 2: Datos del candidato</h5>
              <small>Sube el CV y completa nombre, ciudad y puesto.</small>
            </li>
            <li className="list-group-item">
              <h5 className="mb-1">Paso 3: Pago</h5>
              <small>Elige Estándar (500 MXN) o Urgente (800 MXN) y finaliza.</small>
            </li>
          </ul>
        </div>
      </div>

      {/* PIE: WhatsApp para volumen */}
      <div className="row justify-content-center mt-5">
        <div className="col text-center">
          <p>
            ¿Necesitas varios estudios?&nbsp;
            <a
              href="https://wa.me/525512345678?text=Cotización%20volumen"
              target="_blank"
              rel="noopener noreferrer"
              className="fw-bold"
              style={{ color: '#28a745' }}
            >
              Contáctanos por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
