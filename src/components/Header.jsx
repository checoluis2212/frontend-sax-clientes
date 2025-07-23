// src/components/Header.jsx
import React from 'react';
import logo from '../assets/sax.png'; // Ajusta el path según tu estructura

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-3 mb-4">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <a href="/" className="d-flex align-items-center text-decoration-none">
          <img
            src={logo}
            alt="SAX México"
            width="100"
            height="100"
            className="me-3"
          />
        </a>

        {/* Tagline o subtítulo */}
        <span className="text-muted small">Estudios Socioeconómicos</span>
      </div>
    </header>
  );
};

export default Header;
