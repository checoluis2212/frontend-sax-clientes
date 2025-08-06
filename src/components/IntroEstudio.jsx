import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function IntroEstudio() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container text-center py-5">
      <h1 className="display-5 fw-bold mb-4">
        Solicita un estudio socioeconómico al instante
      </h1>
      <p className="lead mb-5">
        Estándar $500 MXN | Urgente $800 MXN
      </p>

      <div className="row mb-5">
        <div className="col-md-4">
          <img src="/icons/register.svg" alt="Registro" height="80" className="mb-3" />
          <h5>Regístrate</h5>
          <p className="text-muted">Crea tu cuenta en segundos para comenzar.</p>
        </div>
        <div className="col-md-4">
          <img src="/icons/data.svg" alt="Datos" height="80" className="mb-3" />
          <h5>Proporciona los datos</h5>
          <p className="text-muted">Completa la información del candidato y adjunta CV.</p>
        </div>
        <div className="col-md-4">
          <img src="/icons/payment.svg" alt="Pago" height="80" className="mb-3" />
          <h5>Realiza el pago</h5>
          <p className="text-muted">Paga en línea de manera segura con Stripe.</p>
        </div>
      </div>

      <button
        className="btn btn-primary btn-lg"
        onClick={() => navigate('/wizard?step=1')}
        disabled={!user}
      >
        {user ? 'Empezar ahora' : 'Por favor ingresa'}
      </button>
    </div>
  );
}
