import React, { useState, useEffect } from 'react';
import { createEstudio } from '../services/api';

export default function Paso3({ form, setForm, onBack, onNext }) {
  // 1) Opciones con precio y descripción
  const tipos = [
    {
      value: 'estandar',
      label:       'Estándar ($500 MXN)',
      amount:      500,
      description: 'Entrega en 7 días hábiles',
    },
    {
      value: 'urgente',
      label:       'Urgente ($800 MXN)',
      amount:      800,
      description: 'Entrega en 3 días hábiles',
    },
  ];

  // 2) Estado local para validación y carga
  const [touched, setTouched] = useState(false);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  // 3) Efecto solo para validación
  useEffect(() => {
    if (touched && !form.tipo) {
      setError('Selecciona una opción');
    } else {
      setError('');
    }
  }, [form.tipo, touched]);

  // 4) Al cambiar tipo, inyecta tipo, amount y description en el form
  const handleTipoChange = (value) => {
    const sel = tipos.find(t => t.value === value);
    setForm(f => ({
      ...f,
      tipo:        sel.value,
      amount:      sel.amount,
      description: sel.description,
    }));
  };

  // 5) Manejo del clic “Siguiente”
  const handleNext = async () => {
    setTouched(true);
    if (!form.tipo) return;

    try {
      setLoading(true);
      setError('');

      console.log('DEBUG Paso3 envío a backend:', form);
      const res = await createEstudio(form);
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

  // 6) Renderizado
  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Paso 3: Elige el tipo de estudio</h4>

      <div className="mb-4">
        {tipos.map(({ value, label, description }) => (
          <div className="form-check mb-3" key={value}>
            <input
              type="radio"
              name="tipo"
              id={value}
              value={value}
              checked={form.tipo === value}
              onChange={() => handleTipoChange(value)}
              className={`form-check-input ${error ? 'is-invalid' : ''}`}
            />
            <label className="form-check-label" htmlFor={value}>
              {label}
            </label>
            <div className="form-text text-muted">
              {description}
            </div>
          </div>
        ))}

        {error && (
          <div className="invalid-feedback d-block">
            {error}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          onClick={onBack}
          disabled={loading}
        >
          Atrás
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}
