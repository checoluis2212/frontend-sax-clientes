import React, { useState } from 'react'

export default function Paso2({ form, setForm, onBack, onNext }) {
  const [touched, setTouched] = useState({
    cv: false,
    ciudad: false,
    puesto: false,
    nombreCandidato: false,
  })

  const handleFile = (e) => {
    const file = e.target.files[0] || null
    setTouched((t) => ({ ...t, cv: true }))
    setForm((f) => ({ ...f, cv: file }))
  }

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
  }

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))
  }

  const canNext =
  form.cv &&
  form.nombreCandidato?.trim() && // 
  form.ciudad?.trim() &&
  form.puesto?.trim()

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Paso 2: Información del candidato</h4>

      <div className="mb-3">
        <label className="form-label">Sube el CV del candidato</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className={`form-control ${touched.cv && !form.cv ? 'is-invalid' : ''}`}
          onChange={handleFile}
        />
        {touched.cv && !form.cv && (
          <div className="invalid-feedback">Debes seleccionar un archivo</div>
        )}
      </div>

      <div className="mb-3">
       <label className="form-label">Nombre completo del candidato</label>
       <input
         type="text"
         className="form-control"
         value={form.nombreCandidato || ''}
         onChange={(e) => setForm({ ...form, nombreCandidato: e.target.value })}
         onBlur={() => setTouched({ ...touched, nombreCandidato: true })}
         required
      />
      </div>

      <div className="row g-3 mt-3">
        <div className="col-md-6">
          <label className="form-label">Ciudad del candidato</label>
          <input
            type="text"
            className={`form-control ${touched.ciudad && !form.ciudad ? 'is-invalid' : ''}`}
            value={form.ciudad || ''}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            onBlur={() => handleBlur('ciudad')}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Puesto solicitado</label>
          <input
            type="text"
            className={`form-control ${touched.puesto && !form.puesto ? 'is-invalid' : ''}`}
            value={form.puesto || ''}
            onChange={(e) => handleChange('puesto', e.target.value)}
            onBlur={() => handleBlur('puesto')}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
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
