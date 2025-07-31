// src/pages/PedirEstudio.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import IntroEstudio from '../components/IntroEstudio';
import Paso1 from '../components/Paso1';
import Paso2 from '../components/Paso2';
import Paso3 from '../components/Paso3';
import Paso4 from '../components/Paso4';

export default function PedirEstudio({ visitorId }) {
  const navigate = useNavigate();

  // ─── Estado inicial ───────────────────────────────
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
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
    docId: '',
    cvUrl: '',
    tipo: '',
    amount: '',
    visitorId: ''
  });

  // ─── Cargar visitorId y solicitud pendiente ────────
  useEffect(() => {
    if (visitorId) {
      setForm(f => ({ ...f, visitorId }));

      // Verificar si hay solicitud pendiente en localStorage
      const pendiente = localStorage.getItem('solicitudPendiente');
      if (pendiente) {
        const data = JSON.parse(pendiente);
        console.log('📂 Solicitud pendiente encontrada:', data);

        // Cargar form y paso
        setForm(f => ({ ...f, ...data }));
        setStep(data.pasoActual || 0);
      }
    }
  }, [visitorId]);

  // ─── Guardar solicitud en localStorage cuando cambia paso importante ─
  useEffect(() => {
    if (form.docId && step >= 2) { 
      const solicitudPendiente = {
        ...form,
        pasoActual: step
      };
      localStorage.setItem('solicitudPendiente', JSON.stringify(solicitudPendiente));
      console.log('💾 Solicitud guardada en localStorage (Paso', step, ')');
    }
  }, [form, step]);

  // ─── Finalizar ────────────────────────────────────
  const finish = () => {
    localStorage.removeItem('solicitudPendiente'); // Limpiar al terminar
    navigate('/gracias');
  };

  // ─── Render ───────────────────────────────────────
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <img src="/sax.png" alt="SAX Services" height="130" />
          <h6 className="mb-0 text-secondary">Estudios Socioeconómicos</h6>
        </div>
      </header>

      {/* Contenido */}
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
