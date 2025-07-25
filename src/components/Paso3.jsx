// src/components/Paso3.jsx
import React, { useState, useEffect } from 'react';

export default function Paso3({ form, setForm, onBack, onNext }) {
  const tipos = [
    { value: 'estandar', label: 'Estándar ($500 MXN)' },
    { value: 'urgente',  label: 'Urgente ($800 MXN)' },
  ];

  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  // Validación tras interacción
  useEffect(() => {
    if (touched && !form.tipo) {
      setError('Selecciona una opción');
    } else {
      setError('');
    }
  }, [form.tipo, touched]);

  const canNext = form.tipo !== '';

  const handleChange = (value) => {
    setForm(f => ({ ...f, tipo: value }));
    setTouched(true);
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
              onChange={() => handleChange(value)}
              className={`form-check-input ${error ? 'is-invalid' : ''}`}
            />
            <label className="form-check-label" htmlFor={value}>
              {label}
            </label>
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
          type="button"
          className="btn btn-outline-secondary"
          onClick={onBack}
        >
          Atrás
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={!canNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
