import React from 'react'

export default function Paso3({ form, setForm, onBack, onNext }) {
  const tipos = [
    { value: 'estandar', label: 'Estándar ($500 MXN)' },
    { value: 'urgente',  label: 'Urgente ($800 MXN)' },
  ]
  const canNext = form.tipo !== ''

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Paso 3: Elige el tipo de estudio</h4>
      <div className="mb-4">
        {tipos.map(t => (
          <div className="form-check" key={t.value}>
            <input
              className="form-check-input"
              type="radio"
              name="tipo"
              id={t.value}
              value={t.value}
              checked={form.tipo === t.value}
              onChange={() => setForm(f => ({ ...f, tipo: t.value }))}
            />
            <label className="form-check-label" htmlFor={t.value}>
              {t.label}
            </label>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Atrás
        </button>
        <button className="btn btn-primary" onClick={onNext} disabled={!canNext}>
          Siguiente
        </button>
      </div>
    </div>
  )
}
