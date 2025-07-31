// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PedirEstudio from "./pages/PedirEstudio";
import Gracias from './pages/Gracias';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function App() {
  const [visitorId, setVisitorId] = useState(null);
  const [initialForm, setInitialForm] = useState({});
  const [initialStep, setInitialStep] = useState(1);

  useEffect(() => {
    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();
        setVisitorId(visitorId);
        console.log('✅ visitorId obtenido:', visitorId);

        // 🔹 Revisar si hay solicitud pendiente
        const pendiente = localStorage.getItem('solicitudPendiente');
        if (pendiente) {
          const data = JSON.parse(pendiente);
          console.log('📂 Solicitud pendiente encontrada:', data);
          setInitialForm(data);
          setInitialStep(data.pasoActual || 1);
        }
      } catch (err) {
        console.error('❌ Error cargando FingerprintJS:', err);
      }
    };
    initFingerprint();
  }, []);

  if (!visitorId) return <div>Cargando…</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PedirEstudio
              visitorId={visitorId}
              initialForm={initialForm}
              initialStep={initialStep}
            />
          }
        />
        <Route path="/gracias" element={<Gracias visitorId={visitorId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
