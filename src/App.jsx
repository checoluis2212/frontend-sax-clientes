import { BrowserRouter, Routes, Route } from "react-router-dom";
import PedirEstudio from "./pages/PedirEstudio";
import Gracias from './pages/Gracias';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function App() {
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