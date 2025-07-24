import React, { useState, useEffect } from 'react';

export default function Paso3({ form, setForm, onBack, onNext }) {
  const tipos = [
    { value: 'estandar', label: 'Estándar ($500 MXN)' },
    { value: 'urgente',  label: 'Urgente ($800 MXN)' },
  ];

  // Estado local para controlar si ya intentaste avanzar
  const [touched, setTouched] = useState(false);
  // Texto de error
  const [error, setError] = useState('');

  // Cada vez que cambie form.tipo o touched, validamos
  useEffect(() => {
    if (touched && form.tipo === '') {
      setError('Selecciona una opción');
    } else {
      setError('');
    }
  }, [form.tipo, touched]);

  // Sólo puedes avanzar si ya hay algo seleccionado
  const canNext = form.tipo !== '';

  const handleChange = (e) => {
    setForm(f => ({ ...f, tipo: e.target.value }));
    // Marcamos que ya tocaste (evita mostrar error antes de la primera interacción)
    setTouched(true);
  };

  const handleNext = () => {
    setTouched(true);
    if (canNext) {
      onNext();
    }
  };

  return (
    <div className="container py-4">
      <h3>Paso 3: Elige el tipo de estudio</h3>

      <div className="mt-3">
        {tipos.map(({ value, label }) => (
          <div key={value} className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="tipo"
              id={`tipo-${value}`}
              value={value}
              checked={form.tipo === value}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={`tipo-${value}`}>
              {label}
            </label>
          </div>
        ))}

        {error && (
          <div className="text-danger mb-3">
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
          onClick={handleNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
