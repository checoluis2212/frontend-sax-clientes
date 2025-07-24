// src/components/Paso3.jsx
import React, { useState, useEffect } from 'react';

export default function Paso3({ form, setForm, onBack, onNext }) {
  const tipos = [
    { value: 'estandar', label: 'Estándar ($500 MXN)' },
    { value: 'urgente',  label: 'Urgente ($800 MXN)' },
  ];

  // Estado local
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Valida cada vez que cambie la selección o se haya tocado
  useEffect(() => {
    if (touched && form.tipo === '') {
      setError('Selecciona una opción');
    } else {
      setError('');
    }
  }, [form.tipo, touched]);

  // Puede avanzar si hay tipo seleccionado y no está enviando
  const canSubmit = form.tipo !== '' && !submitting;

  // Cuando el usuario selecciona un radio
  const handleChange = (value) => {
    setForm(prev => ({ ...prev, tipo: value }));
    setTouched(true);
  };

  // Envía el formulario al backend
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/estudios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      // Solo una llamada a json()
      const data = await res.json();
      console.log('Servidor respondió:', data);

      // Una vez enviado, avanza
      onNext();
    } catch (err) {
      console.error('Error al enviar estudio:', err);
      // Aquí podrías agregar un toast o mostrar el error en UI
      setError('Hubo un problema al enviar. Intenta de nuevo.');
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
              className={`form-check-input ${error ? 'is-invalid' : ''}`}
              type="radio"
              name="tipo"
              id={value}
              value={value}
              checked={form.tipo === value}
              onChange={() => handleChange(value)}
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
          disabled={submitting}
        >
          Atrás
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {submitting ? 'Enviando…' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}
