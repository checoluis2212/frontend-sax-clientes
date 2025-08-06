// src/components/IntroEstudio.jsx
import React from 'react';
import Header from './Header';
import './IntroEstudio.css'; // Estilos para íconos y layout

export default function IntroEstudio() {
  return (
    <>
      {/* Header persistente */}
      <Header />

      <div className="container text-center py-5">
        {/* Título */}
        <h1 className="display-5 fw-bold mb-3">
          Solicita un estudio socioeconómico al instante
        </h1>
        <p className="lead mb-5 text-muted">
          Estándar $500 MXN | Urgente $800 MXN
        </p>

        {/* Pasos con íconos SVG */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-12 col-md-4 mb-4">
            <img src="/register.svg" alt="Registro" className="icon-step mb-3" />
            <h5 className="fw-semibold">Regístrate</h5>
            <p className="text-muted small">
              Crea tu cuenta en segundos para comenzar.
            </p>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <img src="/data.svg" alt="Datos" className="icon-step mb-3" />
            <h5 className="fw-semibold">Proporciona los datos</h5>
            <p className="text-muted small">
              Completa la información del candidato y adjunta CV.
            </p>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <img src="/payment.svg" alt="Pago" className="icon-step mb-3" />
            <h5 className="fw-semibold">Realiza el pago</h5>
            <p className="text-muted small">
              Paga en línea de manera segura con Stripe.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
