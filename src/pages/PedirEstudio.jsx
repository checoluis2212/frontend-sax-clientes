import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import IntroEstudio from '../components/IntroEstudio';
import Paso1 from '../components/Paso1';
import Paso2 from '../components/Paso2';
import Paso3 from '../components/Paso3';
import Paso4 from '../components/Paso4';

export default function PedirEstudio() {
  const navigate = useNavigate();

  // 1) Inicializamos el paso leyendo localStorage (si existe)
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem('pedirEstudioStep');
    return saved !== null ? Number(saved) : 0;
  });

  // 2) Estado de formulario inicial, leyendo docId y cvUrl de localStorage
  const [form, setForm] = useState(() => ({
    nombre: '',
    apellido: '',
    empresa: '',
    telefono: '',
    email: '',
    nombreSolicitante: '',
    nombreCandidato: '',
    ciudad: '',
    puesto: '',
    cv: null,
    docId: localStorage.getItem('estudioDocId') || '',
    cvUrl: localStorage.getItem('estudioCvUrl') || '',
    tipo: '',
    visitorId: ''
  }));

  // 3) Guardar step en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('pedirEstudioStep', step);
  }, [step]);

  // 4) Guardar docId y cvUrl en localStorage cuando se actualicen
  useEffect(() => {
    if (form.docId) localStorage.setItem('estudioDocId', form.docId);
    if (form.cvUrl) localStorage.setItem('estudioCvUrl', form.cvUrl);
  }, [form.docId, form.cvUrl]);

  // 5) Si ya hay docId y estamos antes del Paso 3, saltar al Paso 3
  useEffect(() => {
    if (form.docId && step < 3) setStep(3);
  }, [form.docId, step]);

  // FingerprintJS: capturar visitorId
  useEffect(() => {
    if (!form.visitorId) {
      FingerprintJS.load()
        .then(fp => fp.get())
        .then(res => setForm(f => ({ ...f, visitorId: res.visitorId })))
        .catch(console.error);
    }
  }, [form.visitorId]);

  // Al finalizar (Paso 4) limpiamos el paso y los datos persistidos
  const finish = () => {
    localStorage.removeItem('pedirEstudioStep');
    localStorage.removeItem('estudioDocId');
    localStorage.removeItem('estudioCvUrl');
    navigate('/gracias');
  };

  return (
    <>
      {/* Header fijo… */}
      <header className="bg-white shadow-sm py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <img src="/sax.png" alt="SAX Services" height="60" />
          <h6 className="mb-0 text-secondary">Estudios Socioeconómicos</h6>
        </div>
      </header>

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
