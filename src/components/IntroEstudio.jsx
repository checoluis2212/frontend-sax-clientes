import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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
        <div className="col-md-4 mb-4">
          <img src="/register.svg" alt="Registro" height="80" className="mb-3" />
          <h5 className="fw-semibold">Regístrate</h5>
          <p className="text-muted small">Crea tu cuenta en segundos para comenzar.</p>
        </div>
        <div className="col-md-4 mb-4">
          <img src="/data.svg" alt="Datos" height="80" className="mb-3" />
          <h5 className="fw-semibold">Proporciona los datos</h5>
          <p className="text-muted small">Completa la información del candidato y adjunta CV.</p>
        </div>
        <div className="col-md-4 mb-4">
          <img src="/payment.svg" alt="Pago" height="80" className="mb-3" />
          <h5 className="fw-semibold">Realiza el pago</h5>
          <p className="text-muted small">Paga en línea de manera segura con Stripe.</p>
        </div>
      </div>

      {user ? (
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/wizard?step=1')}>
          Empezar ahora
        </button>
      ) : (
        <div>
          <p className="text-muted">Inicia sesión o regístrate para comenzar</p>
          <Link to="/login" className="btn btn-primary me-2">Ingresar</Link>
          <Link to="/signup" className="btn btn-outline-secondary">Crear cuenta</Link>
        </div>
      )}
    </div>
  );
}
