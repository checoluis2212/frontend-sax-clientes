// src/components/IntroEstudio.jsx
import React from 'react';

export default function IntroEstudio({ onStart }) {
  return (
    <div
      className="py-5 text-white"
      style={{
        background: 'linear-gradient(135deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)'
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* IZQUIERDA: Título y CTA */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="display-3 fw-bold">
              Solicita tu primer estudio
              <br />
              socioeconómico
            </h1>
            <p className="lead mt-3">
              Compra de prueba en línea:
              <span className="badge bg-light text-dark mx-2">Estándar 500 MXN</span>
              <span className="badge bg-light text-dark">Urgente 800 MXN</span>
            </p>
            <p>
              Conoce el perfil completo de tu candidato en tres pasos rápidos y sin complicaciones.
            </p>
            <button
              className="btn btn-light btn-lg mt-4 shadow"
              onClick={onStart}
            >
              <i className="bi bi-rocket-fill me-2"></i>
              Empezar ahora
            </button>
          </div>

          {/* DERECHA: Pasos */}
          <div className="col-md-6">
            <div className="card shadow-lg">
              <ul className="list-group list-group-flush">
                {[
                  {
                    title: 'Tus datos personales',
                    desc: 'Nombre, apellido, empresa, teléfono y email.'
                  },
                  {
                    title: 'Datos del candidato',
                    desc: 'Sube CV y completa nombre, ciudad y puesto.'
                  },
                  {
                    title: 'Pago',
                    desc: 'Elige Estándar (500 MXN) o Urgente (800 MXN) y finaliza.'
                  }
                ].map((stepItem, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex align-items-start"
                  >
                    <span className="badge bg-primary rounded-pill me-3">
                      {i + 1}
                    </span>
                    <div>
                      <h6 className="mb-1">{stepItem.title}</h6>
                      <small className="text-muted">{stepItem.desc}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pie: WhatsApp para volumen */}
        <div className="row justify-content-center mt-5">
          <div className="col text-center">
            <p className="text-light">
              ¿Necesitas varios estudios?&nbsp;
              <a
                href="https://wa.me/525512345678?text=Cotización%20volumen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warning fw-bold"
              >
                Contáctanos por WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
