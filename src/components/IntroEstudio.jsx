// src/components/IntroEstudio.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function IntroEstudio() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <img src="/sax.png" alt="SAX Services" height="130" />
  

          {/* Botones de Login/Signup o Logout */}
          <div className="d-flex align-items-center">
            {user && (
              <span className="me-3 text-muted">
                Hola, {user.email}
              </span>
            )}
            {user ? (
              <button
                className="btn btn-outline-secondary"
                onClick={() => logout()}
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link to="/login"  className="btn btn-link">Ingresar</Link>
                <Link to="/signup" className="btn btn-primary ms-2">Crear cuenta</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container text-center py-5">
        <h1 className="display-5 fw-bold">
          Solicita un estudio socioeconómico al instante
        </h1>
        <p className="lead">
          Estándar $500 MXN | Urgente $800 MXN
        </p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/wizard')}
          disabled={!user}
        >
          {user ? 'Empezar ahora' : 'Por favor ingresa'}
        </button>
      </div>

      {/* Sección de pasos */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-4">¿Cómo funciona?</h2>
        <div className="row text-center gx-4">
          {/* Paso 1 */}
          <div className="col-6 col-md-3 mb-4">
            <div className="mb-3 mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 90, height: 90 }}>
              📝
            </div>
            <h5 className="mt-2">Regístrate</h5>
            <p className="small">Crea tu cuenta o inicia sesión para comenzar tu solicitud.</p>
          </div>

          {/* Paso 2 */}
          <div className="col-6 col-md-3 mb-4">
            <div className="mb-3 mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 90, height: 90 }}>
              📄
            </div>
            <h5 className="mt-2">Completa tus datos</h5>
            <p className="small">Ingresa la información del candidato y sube el CV.</p>
          </div>

          {/* Paso 3 */}
          <div className="col-6 col-md-3 mb-4">
            <div className="mb-3 mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 90, height: 90 }}>
              💳
            </div>
            <h5 className="mt-2">Realiza el pago</h5>
            <p className="small">Paga de forma segura con Stripe y comenzamos el estudio.</p>
          </div>

          {/* Paso 4 */}
          <div className="col-6 col-md-3 mb-4">
            <div className="mb-3 mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 90, height: 90 }}>
              ✅
            </div>
            <h5 className="mt-2">Recibe tu estudio</h5>
            <p className="small">Recibirás tu estudio finalizado en tu correo electrónico.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

