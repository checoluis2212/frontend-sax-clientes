// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/sax.png';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm py-3 mb-4">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img src={logo} alt="SAX México" width="100" height="100" />
        </Link>

        {/* Botones autenticación */}
        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="me-3 text-muted">Hola, {user.email}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={logout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-link me-2">
                Ingresar
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
