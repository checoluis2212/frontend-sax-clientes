// src/pages/PedirEstudio.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import IntroEstudio from '../components/IntroEstudio';
import Paso1 from '../components/Paso1';
import Paso2 from '../components/Paso2';
import Paso3 from '../components/Paso3';
import Paso4 from '../components/Paso4';

const initialForm = {
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

export default function PedirEstudio({ visitorId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // 🔹 Leer step inicial desde URL ANTES del primer render
  const params = new URLSearchParams(location.search);
  const initialStepFromUrl = parseInt(params.get('step'), 10);
  const [step, setStep] = useState(!isNaN(initialStepFromUrl) ? initialStepFromUrl : 0);

  const [form, setForm] = useState({ ...initialForm });
  const [mensajeCancelado, setMensajeCancelado] = useState('');

  useEffect(() => {
    if (step > 0 && !user) {
      navigate('/login');
    }
  }, [step, user, navigate]);

  useEffect(() => {
    if (!visitorId) return;

    const params = new URLSearchParams(location.search);

    if (params.get('pagado') === 'true') {
      localStorage.removeItem('solicitudPendiente');
      navigate('/gracias');
      return;
    }

    setForm(f => ({ ...f, visitorId }));

    const pendiente = localStorage.getItem('solicitudPendiente');
    if (pendiente && isNaN(initialStepFromUrl)) {
      const data = JSON.parse(pendiente);

      if (params.get('cancelado') === 'true') {
        setMensajeCancelado('El pago fue cancelado. Puedes reintentarlo.');
      }

      setForm(f => ({ ...f, ...data }));
      setStep(data.pasoActual || 0);
    }
  }, [visitorId, location.search, navigate, initialStepFromUrl]);

  const finish = useCallback(() => {
    localStorage.removeItem('solicitudPendiente');
    navigate('/gracias');
  }, [navigate]);

  const reset = useCallback(() => {
    localStorage.removeItem('solicitudPendiente');
    setForm({ ...initialForm, visitorId });
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
