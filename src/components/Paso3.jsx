// src/components/Paso3.jsx
import React, { useState, useEffect } from 'react';

export default function Paso3({ form, setForm, onBack, onNext }) {
  const tipos = [
    { value: 'estandar', label: 'Estándar ($500 MXN)' },
    { value: 'urgente',  label: 'Urgente ($800 MXN)' },
  ];

  const [touched, setTouched] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Validar tras interacción
  useEffect(() => {
    if (touched && !form.tipo) {
      setFieldError('Selecciona una opción');
    } else {
      setFieldError('');
    }
  }, [form.tipo, touched]);

  // Cambio de radio
  const handleChange = (value) => {
    setForm(f => ({ ...f, tipo: value }));
    setTouched(true);
  };

  // Enviar elección al servidor
  const handleSubmit = async () => {
    setSubmitError('');
    setSubmitting(true);

    // Validación previa
    if (!form.tipo) {
      setFieldError('Selecciona una opción');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/estudios/seleccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docId: form.docId,
          tipo: form.tipo,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || res.statusText);
      }

      // Leer JSON solo si existe
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        await res.json();
      }

      onNext();
    } catch (err) {
      console.error('Error al enviar tipo de estudio:', err);
      setSubmitError('No se pudo guardar tu elección. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Paso 3: Elige el tipo de estudio</h4>

      <div className="mb-3">
        {tipos.map(({ value, label }) => (
          <div className="form-check mb-2" key={value}>
            <input
              type="radio"
              name="tipo"
              id={value}
              className={`form-check-input ${fieldError ? 'is-invalid' : ''}`}
              checked={form.tipo === value}
              onChange={() => handleChange(value)}
            />
            <label className="form-check-label" htmlFor={value}>
              {label}
            </label>
          </div>
        ))}

        {fieldError && (
          <div className="invalid-feedback d-block">
            {fieldError}
          </div>
        )}
      </div>

      {submitError && (
        <div className="alert alert-danger">
          {submitError}
        </div>
      )}

      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onBack}
          disabled={submitting}
        >
          Atrás
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Guardando…' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}
