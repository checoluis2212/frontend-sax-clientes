// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import { AuthProvider }   from './contexts/AuthContext';
import ProtectedRoute     from './components/ProtectedRoute';

import Signup             from './pages/Signup';
import Login              from './pages/Login';
import PedirEstudio       from './pages/PedirEstudio';
import Gracias            from './pages/Gracias';
import IntroEstudio       from './components/IntroEstudio'; // 🔹 Asegúrate de tener este componente

function App() {
  const [visitorId, setVisitorId]     = useState(null);
  const [initialForm, setInitialForm] = useState({});
  const [initialStep, setInitialStep] = useState(1);

  useEffect(() => {
    const initFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);

      const pendiente = localStorage.getItem('solicitudPendiente');
      if (pendiente) {
        const data = JSON.parse(pendiente);
        setInitialForm(data);
        setInitialStep(data.pasoActual || 1);
      }
    };
    initFingerprint();
  }, []);

  if (!visitorId) return <div>Cargando…</div>;

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 🔹 Home público */}
          <Route path="/" element={<IntroEstudio />} />

          {/* 🔹 Autenticación */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login"  element={<Login />}  />

          {/* 🔹 Wizard protegido */}
          <Route
            path="/wizard"
            element={
              <ProtectedRoute>
                <PedirEstudio
                  visitorId={visitorId}
                  initialForm={initialForm}
                  initialStep={initialStep}
                />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Gracias protegido */}
          <Route
            path="/gracias"
            element={
              <ProtectedRoute>
                <Gracias visitorId={visitorId} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
