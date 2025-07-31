// src/pages/PedirEstudio.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import IntroEstudio from '../components/IntroEstudio';
import Paso1 from '../components/Paso1';
import Paso2 from '../components/Paso2';
import Paso3 from '../components/Paso3';
import Paso4 from '../components/Paso4';

export default function PedirEstudio({ visitorId }) {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [mensajeCancelado, setMensajeCancelado] = useState('');

  useEffect(() => {
    if (!visitorId) return;

    const urlParams = new URLSearchParams(location.search);

    // 🔹 Pago exitoso
    if (urlParams.get('pagado') === 'true') {
      localStorage.removeItem('solicitudPendiente'); // limpiar datos guardados
      navigate('/gracias'); // ir a página de agradecimiento
      return;
    }

    // 🔹 Guardar visitorId en form
    setForm(f => ({ ...f, visitorId }));

    const pendiente = localStorage.getItem('solicitudPendiente');
    if (pendiente) {
      const data = JSON.parse(pendiente);

      // 🔹 Pago cancelado
      if (urlParams.get('cancelado') === 'true') {
        setMensajeCancelado('El pago fue cancelado. Puedes reintentarlo.');
      }

      // 🔹 Restaurar datos y paso
      setForm(f => ({ ...f, ...data }));
      setStep(data.pasoActual || 0);
    }
  }, [visitorId, location.search]);

  const finish = () => {
    localStorage.removeItem('solicitudPendiente');
    navigate('/gracias');
  };

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
            mensajeCancelado={mensajeCancelado}
            onBack={() => setStep(3)}
            onFinish={finish}
          />
        )}
      </div>
    </>
  );
}
