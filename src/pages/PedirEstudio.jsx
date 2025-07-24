// src/pages/PedirEstudio.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import IntroEstudio from '../components/IntroEstudio';
import Paso1 from '../components/Paso1';
import Paso2 from '../components/Paso2';
import Paso3 from '../components/Paso3';
import Paso4 from '../components/Paso4';

export default function PedirEstudio() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    // Paso 1
    nombre: '',
    apellido: '',
    empresa: '',
    telefono: '',
    email: '',
    nombreSolicitante: '',
    // Paso 2
    nombreCandidato: '',
    ciudad: '',
    puesto: '',
    cv: null,
    docId: '',
    cvUrl: '',
    // Paso 3
    tipo: '',
    // FingerprintJS
    visitorId: '',
  });

  const navigate = useNavigate();

  // Al montar, carga FingerprintJS y guarda visitorId
  useEffect(() => {
    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setForm(f => ({ ...f, visitorId: result.visitorId }));
        console.log('✅ visitorId:', result.visitorId);
      } catch (err) {
        console.error('❌ Error inicializando FingerprintJS:', err);
      }
    };
    if (!form.visitorId) {
      initFingerprint();
    }
  }, [form.visitorId]);

  return (
    <>
      {/* HEADER FIJO */}
      <header className="bg-white shadow-sm py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <img
            src="/sax.png"
            alt="SAX Servicios Empresariales"
            height="60"
          />
          <h6 className="mb-0 text-secondary">Estudios Socioeconómicos</h6>
        </div>
      </header>

      {/* PASOS */}
      <div className="container mb-5">
        {step === 0 && (
          <IntroEstudio onStart={() => setStep(1)} />
        )}

        {step === 1 && (
          <Paso1
            form={form}
            setForm={setForm}
            onNext={() => {
              // concatenar nombreSolicitante
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
            onFinish={() => navigate('/gracias')}
          />
        )}
      </div>
    </>
  );
}
