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
          <h6 className="mb-0 text-secondary">Estudios Socioeconómicos</h6>

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
          disabled={!user} // opcional: solo permitir si está logueado
        >
          {user ? 'Empezar ahora' : 'Por favor ingresa'}
        </button>
      </div>
    </div>
  );
}
