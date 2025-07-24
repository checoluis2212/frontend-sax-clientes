// src/pages/PedirEstudio.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import IntroEstudio from '../components/IntroEstudio';
import Paso1         from '../components/Paso1';
import Paso2         from '../components/Paso2';
import Paso3         from '../components/Paso3';
import Paso4         from '../components/Paso4';

export default function PedirEstudio() {
  const navigate = useNavigate();

  // 1) Inicializamos el paso leyendo localStorage (si existe)
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem('pedirEstudioStep');
    return saved !== null ? Number(saved) : 0;
  });

  // 2) Cada vez que cambie step, lo guardamos
  useEffect(() => {
    localStorage.setItem('pedirEstudioStep', step);
  }, [step]);

  const [form, setForm] = useState({
    nombre: '', apellido: '', empresa: '', telefono: '', email: '',
    nombreSolicitante: '',
    nombreCandidato: '', ciudad: '', puesto: '', cv: null, docId: '', cvUrl: '',
    tipo: '',
    visitorId: ''
  });

  // FingerprintJS (igual que antes)
  useEffect(() => {
    if (!form.visitorId) {
      FingerprintJS.load()
        .then(fp => fp.get())
        .then(res => setForm(f => ({ ...f, visitorId: res.visitorId })))
        .catch(console.error);
    }
  }, [form.visitorId]);

  // Al finalizar (Paso4) limpiamos el paso guardado
  const finish = () => {
    localStorage.removeItem('pedirEstudioStep');
    navigate('/gracias');
  };

  return (
    <>
      {/* Header fijo… */}

      <div className="container mb-5">
        {step === 0 && <IntroEstudio onStart={() => setStep(1)} />}

        {step === 1 && (
          <Paso1
            form={form}
            setForm={setForm}
            onNext={() => {
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
            setForm={setForm}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <Paso4
            form={form}
            onBack={() => setStep(3)}
            onFinish={finish}
          />
        )}
      </div>
    </>
  );
}
