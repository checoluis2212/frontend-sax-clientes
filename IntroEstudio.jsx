// src/components/IntroEstudio.jsx
import React from 'react';

export default function IntroEstudio({ onStart }) {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* IZQUIERDA: título y llamada a la acción */}
        <div className="col-md-6">
          <h1 className="display-4 mb-4">
            Solicita tu primer estudio socioeconómico
          </h1>
          <p className="lead">
            Compra de prueba en línea: <strong>Estándar 500 MXN</strong> | <strong>Urgente 800 MXN</strong>.
          </p>
          <p>Conoce el perfil completo de tu candidato en tres sencillos pasos.</p>
          <button
            className="btn btn-primary btn-lg mt-3"
            onClick={onStart}
          >
            Empezar ahora
          </button>
        </div>

        {/* DERECHA: lista de pasos */}
        <div className="col-md-6">
          <ol className="list-group list-group-numbered">
            <li className="list-group-item mb-3">
              <h5>Paso 1: Tus datos personales</h5>
              <small>Nombre, apellido, empresa, teléfono y email.</small>
            </li>
            <li className="list-group-item mb-3">
              <h5>Paso 2: Datos del candidato</h5>
              <small>Sube el CV y completa nombre, ciudad y puesto.</small>
            </li>
            <li className="list-group-item">
              <h5>Paso 3: Pago</h5>
              <small>Elige Estándar (500 MXN) o Urgente (800 MXN) y finaliza.</small>
            </li>
          </ol>
        </div>
      </div>

      {/* Pie: enlace para volumen por WhatsApp */}
      <div className="row justify-content-center mt-5">
        <div className="col text-center">
          <p>
            ¿Necesitas varios estudios?&nbsp;
            <a
              href="https://wa.me/525512345678?text=Cotización%20volumen"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contáctanos por WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    </div>
);
}
