import React, { useState } from 'react'

export default function Paso2({ form, setForm, onBack, onNext }) {
  const [touched, setTouched] = useState(false)

  const handleFile = (e) => {
    setTouched(true)
    const file = e.target.files[0] || null
    setForm(f => ({ ...f, cv: file }))
  }

  const canNext = form.cv !== null

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Paso 2: Sube tu CV</h4>
      <div className="mb-3">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className={`form-control ${touched && !form.cv ? 'is-invalid' : ''}`}
          onChange={handleFile}
        />
        {touched && !form.cv && (
          <div className="invalid-feedback">Debes seleccionar un archivo</div>
        )}
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
