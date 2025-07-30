// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PedirEstudio from "./pages/PedirEstudio";
import Gracias from './pages/Gracias';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function App() {
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();
        setVisitorId(visitorId);
        console.log('✅ visitorId obtenido:', visitorId);
      } catch (err) {
        console.error('❌ Error cargando FingerprintJS:', err);
      }
    };
    initFingerprint();
  }, []);

  // Mientras no lo tengas, muestra un loader o nada
  if (!visitorId) return <div>Cargando…</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PedirEstudio visitorId={visitorId} />} />
        <Route path="/gracias" element={<Gracias visitorId={visitorId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
