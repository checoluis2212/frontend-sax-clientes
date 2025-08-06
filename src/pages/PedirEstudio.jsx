// src/pages/PedirEstudio.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import IntroEstudio from '../components/IntroEstudio';
import Paso1 from '../components/Paso1';
import Paso2 from '../components/Paso2';
import Paso3 from '../components/Paso3';
import Paso4 from '../components/Paso4';

const defaultForm = {
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
};

export default function PedirEstudio({ visitorId, initialForm = {}, initialStep = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // 🔹 Leer step desde URL si está presente
  const params = new URLSearchParams(location.search);
  const stepFromUrl = parseInt(params.get('step'), 10);

  const [step, setStep] = useState(!isNaN(stepFromUrl) ? stepFromUrl : (initialStep || 0));
  const [form, setForm] = useState({ ...defaultForm, ...initialForm, visitorId });
  const [mensajeCancelado, setMensajeCancelado] = useState('');

  // 🔒 Si no está logueado y ya está en pasos, redirigir a login
  useEffect(() => {
    if (step > 0 && !user) {
      navigate('/login');
    }
  }, [step, user, navigate]);

  // 🔁 Forzar paso 1 si hay usuario logueado y estamos en 0
  useEffect(() => {
    if (user && step === 0) {
      setStep(1);
    }
  }, [user, step]);

  // 🔁 Stripe y restaurar desde localStorage si no vino de App
  useEffect(() => {
    if (!visitorId) return;

    if (params.get('pagado') === 'true') {
      localStorage.removeItem('solicitudPendiente');
      navigate('/gracias');
      return;
    }

    if (params.get('cancelado') === 'true') {
      setMensajeCancelado('El pago fue cancelado. Puedes reintentarlo.');
    }

    const local = localStorage.getItem('solicitudPendiente');
    if (local && !initialForm?.nombreCandidato) {
      const data = JSON.parse(local);
      setForm(f => ({ ...f, ...data }));
      setStep(data.pasoActual || step);
    }

  }, [visitorId, location.search, navigate, initialForm, params, step]);

  const finish = useCallback(() => {
    localStorage.removeItem('solicitudPendiente');
    navigate('/gracias');
  }, [navigate]);

  const reset = useCallback(() => {
    localStorage.removeItem('solicitudPendiente');
    setForm({ ...defaultForm, visitorId });
    setMensajeCancelado('');
    setStep(0);
  }, [visitorId]);

  return (
    <>
      <header className="bg-white shadow-sm py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <img src="/sax.png" alt="SAX Services" height="130" />
          <h6 className="mb-0 text-secondary">Estudios Socioeconómicos</h6>
        </div>
      </header>

      <div className="container mb-5">
        {step === 0 && (
          <IntroEstudio onStart={() => setStep(1)} />
        )}
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
            mensajeCancelado={mensajeCancelado}
            onBack={() => setStep(3)}
            onFinish={finish}
            onReset={reset}
          />
        )}
      </div>
    </>
  );
}
