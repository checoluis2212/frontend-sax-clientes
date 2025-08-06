import React, { useState, useEffect } from 'react'

export default function Paso1({ form, setForm, onNext }) {
  const [touched, setTouched] = useState({
    nombre: false,
    apellido: false,
    empresa: false,
    telefono: false,
    email: false,
  })
  const [errors, setErrors] = useState({})

  // 🔍 Reglas de validación
  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
  const isTel10 = (s) => /^[0-9]{10}$/.test(s)

  // 🛠 Validaciones dinámicas
  useEffect(() => {
    const e = {}
    if (touched.nombre && form.nombre.trim() === '') e.nombre = 'Requerido'
    if (touched.apellido && form.apellido.trim() === '') e.apellido = 'Requerido'
    if (touched.empresa && form.empresa.trim() === '') e.empresa = 'Requerido'
    if (touched.telefono && !isTel10(form.telefono)) e.telefono = 'Debe tener 10 dígitos'
    if (touched.email && !isEmail(form.email)) e.email = 'Correo inválido'
    setErrors(e)
  }, [form, touched])

  const canNext =
    form.nombre.trim() &&
    form.apellido.trim() &&
    form.empresa.trim() &&
    isTel10(form.telefono) &&
    isEmail(form.email)

  const handleBlur = (field) =>
    setTouched((t) => ({ ...t, [field]: true }))

  // 🔄 Avanzar al siguiente paso garantizando que el form esté actualizado
  const handleNext = () => {
    const updatedForm = {
      ...form,
      nombreSolicitante: `${form.nombre.trim()} ${form.apellido.trim()}`
    }
    setForm(updatedForm)
    onNext(updatedForm) // pasamos el form actualizado
  }

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Paso 1: Introduce tus datos personales</h4>
      <div className="row g-3">
        {[
          { key: 'nombre', label: 'Nombre' },
          { key: 'apellido', label: 'Apellido' },
          { key: 'empresa', label: 'Empresa' },
        ].map(({ key, label }) => (
          <div className="col-md-4" key={key}>
            <label className="form-label">{label}</label>
            <input
              type="text"
              className={`form-control ${errors[key] ? 'is-invalid' : touched[key] ? 'is-valid' : ''}`}
              value={form[key]}
              onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
              onBlur={() => handleBlur(key)}
            />
            {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
          </div>
        ))}

        <div className="col-md-4">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className={`form-control ${errors.telefono ? 'is-invalid' : touched.telefono ? 'is-valid' : ''}`}
            value={form.telefono}
            onChange={(e) => setForm(f => ({ ...f, telefono: e.target.value }))}
            onBlur={() => handleBlur('telefono')}
          />
          {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : touched.email ? 'is-valid' : ''}`}
            value={form.email}
            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
            onBlur={() => handleBlur('email')}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!canNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
