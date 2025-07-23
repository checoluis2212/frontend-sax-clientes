// src/pages/PedirEstudio.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IntroEstudio from '../components/IntroEstudio';
import Paso1 from '../components/Paso1';
import Paso2 from '../components/Paso2';
import Paso3 from '../components/Paso3';
import Paso4 from '../components/Paso4';

export default function PedirEstudio() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    telefono: '',
    email: '',
    nombreCandidato: '',
    ciudad: '',
    puesto: '',
    cv: null,
    docId: '',
    cvUrl: '',
  });
  const navigate = useNavigate();

  return (
    <>
      {/* ─── HEADER FIJO ───────────────────────────────────────────── */}
      <header className="bg-white shadow-sm py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo SAX */}
          <img
            src="sax.png"
            alt="SAX Servicios Empresariales"
            height="100"
            width="100"
          />
          {/* Título fijo */}
          <h6 className="mb-0 text-secondary">Estudios Socioeconómicos</h6>
        </div>
      </header>

      {/* ─── CONTENIDO DINÁMICO SEGÚN STEP ──────────────────────────── */}
      <div className="container">
        {step === 0 && <IntroEstudio onStart={() => setStep(1)} />}

        {step === 1 && (
          <Paso1
            form={form}
            setForm={setForm}
            onNext={() => {
              // concatena nombreSolicitante
              setForm(f => ({
                ...f,
                nombreSolicitante: `${f.nombre.trim()} ${f.apellido.trim()}`
              }));
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <Paso2
            form={form}
            setForm={setForm}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <Paso3
            form={form}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <Paso4
            form={form}
            onBack={() => setStep(3)}
            onFinish={() => navigate('/gracias')}
          />
        )}
      </div>
    </>
  );
}
