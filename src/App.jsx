import { BrowserRouter, Routes, Route } from "react-router-dom";
import PedirEstudio from "./pages/PedirEstudio";
import Gracias from './pages/Gracias';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        localStorage.setItem('visitorId', result.visitorId);
        console.log('✅ visitorId guardado:', result.visitorId);
      } catch (err) {
        console.error('❌ Error cargando FingerprintJS:', err);
      }
    };

    if (!localStorage.getItem('visitorId')) {
      initFingerprint();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PedirEstudio />} />
        <Route path="/gracias" element={<h1>Gracias por tu compra 🎉</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
