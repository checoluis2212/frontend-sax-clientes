// src/components/IntroEstudio.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header'; // Header global
import './IntroEstudio.css';

export default function IntroEstudio() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* 🔹 Header en la parte superior */}
      <Header />

      <div className="container text-center py-5">
        {/* Título principal */}
        <h1 className="display-5 fw-bold mb-4">
          Solicita un estudio socioeconómico al instante
        </h1>
        <p className="lead mb-5 text-muted">
          Estándar $500 MXN | Urgente $800 MXN
        </p>

        {/* Pasos */}
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

        {/* Botón de acción */}
        {user ? (
          <button
            className="btn btn-primary btn-lg shadow-sm"
            onClick={() => navigate('/wizard?step=1')}
          >
            Empezar ahora
          </button>
        ) : (
          <div>
            <p className="text-muted">Inicia sesión o regístrate para comenzar</p>
            <Link to="/login" className="btn btn-primary me-2 shadow-sm">
              Ingresar
            </Link>
            <Link to="/signup" className="btn btn-outline-secondary shadow-sm">
              Crear cuenta
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
