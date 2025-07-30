import React, { useState, useEffect } from 'react';
import { guardarSolicitud } from '../services/api';

export default function Paso3({ form, setForm, onBack, onNext }) {
  const tipos = [
    { value: 'estandar', label: 'Estándar ($500 MXN)' },
    { value: 'urgente',  label: 'Urgente ($800 MXN)' },
  ];

  const [touched, setTouched] = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (touched && !form.tipo) {
      setError('Selecciona una opción');
    } else {
      setError('');
    }
  }, [form.tipo, touched]);

  const handleNext = async () => {
    setTouched(true);
    if (!form.tipo) return;

    try {
      setLoading(true);
      setError('');

      console.log('DEBUG Paso3 envío a backend:', form);
      const res = await guardarSolicitud(form); // Backend crea cliente/submission
      console.log('DEBUG Paso3 respuesta backend:', res);

      if (!res.ok || !res.docId) {
        throw new Error('No se recibió docId');
      }

      setForm(f => ({ ...f, docId: res.docId }));
      onNext();
    } catch (err) {
      console.error('❌ Error en Paso3:', err);
      setError('No se pudo guardar la solicitud. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Paso 3: Elige el tipo de estudio</h4>

      <div className="mb-4">
        {tipos.map(({ value, label }) => (
          <div className="form-check mb-2" key={value}>
            <input
              type="radio"
              name="tipo"
              id={value}
              value={value}
              checked={form.tipo === value}
              onChange={() => setForm(f => ({ ...f, tipo: value }))}
              className={`form-check-input ${error ? 'is-invalid' : ''}`}
            />
            <label className="form-check-label" htmlFor={value}>
              {label}
            </label>
          </div>
        ))}
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={onBack} disabled={loading}>
          Atrás
        </button>
        <button className="btn btn-primary" onClick={handleNext} disabled={loading}>
          {loading ? 'Guardando...' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}
