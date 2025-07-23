// src/components/Paso2.jsx
import React, { useState } from 'react';

export default function Paso2({ form, setForm, onBack, onNext }) {
  const [touched, setTouched] = useState({
    cv: false,
    nombreCandidato: false,
    ciudad: false,
    puesto: false,
  });

  // Genéricos para inputs de texto
  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };
  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  // Manejo de archivo
  const handleFile = (e) => {
    const file = e.target.files[0] || null;
    setTouched((t) => ({ ...t, cv: true }));
    setForm((f) => ({ ...f, cv: file }));
  };

  // Envío con FormData
  const handleSubmitPaso2 = async () => {
    const fd = new FormData();
    fd.append('cv', form.cv);
    fd.append('nombreCandidato', form.nombreCandidato);
    fd.append('ciudad', form.ciudad);
    fd.append('puesto', form.puesto);
    // Si tienes más campos de Paso 1, añádelos aquí:
    // fd.append('otroCampo', form.otroCampo);

    try {
      const res = await fetch('/api/estudios', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) {
        let errorData;
        try { errorData = await res.json(); }
        catch { errorData = await res.text(); }
        console.error('Error al subir estudio:', errorData);
        return;
      }
      const data = await res.json();
      console.log('Estudio guardado:', data);
      onNext();
    } catch (error) {
      console.error('Error de red al enviar estudio:', error);
    }
  };

  // Habilita “Siguiente” solo si todo está completo
  const canNext =
    form.cv &&
    form.nombreCandidato?.trim().length > 0 &&
    form.ciudad?.trim().length > 0 &&
    form.puesto?.trim().length > 0;

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Paso 2: Información del candidato</h4>

      {/* CV */}
      <div className="mb-3">
        <label className="form-label">Sube el CV del candidato</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className={`form-control ${touched.cv && !form.cv ? 'is-invalid' : ''}`}
          onChange={handleFile}
        />
        {touched.cv && !form.cv && (
          <div className="invalid-feedback">
            Debes seleccionar un archivo (.pdf, .doc, .docx)
          </div>
        )}
      </div>

      {/* Nombre completo */}
      <div className="mb-3">
        <label className="form-label">Nombre completo del candidato</label>
        <input
          type="text"
          className={`form-control ${
            touched.nombreCandidato && !form.nombreCandidato?.trim() ? 'is-invalid' : ''
          }`}
          value={form.nombreCandidato || ''}
          onChange={handleChange('nombreCandidato')}
          onBlur={handleBlur('nombreCandidato')}
        />
        {touched.nombreCandidato && !form.nombreCandidato?.trim() && (
          <div className="invalid-feedback">Este campo es obligatorio</div>
        )}
      </div>

      {/* Ciudad y Puesto */}
      <div className="row g-3 mt-3">
        <div className="col-md-6">
          <label className="form-label">Ciudad del candidato</label>
          <input
            type="text"
            className={`form-control ${
              touched.ciudad && !form.ciudad?.trim() ? 'is-invalid' : ''
            }`}
            value={form.ciudad || ''}
            onChange={handleChange('ciudad')}
            onBlur={handleBlur('ciudad')}
          />
          {touched.ciudad && !form.ciudad?.trim() && (
            <div className="invalid-feedback">Este campo es obligatorio</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Puesto solicitado</label>
          <input
            type="text"
            className={`form-control ${
              touched.puesto && !form.puesto?.trim() ? 'is-invalid' : ''
            }`}
            value={form.puesto || ''}
            onChange={handleChange('puesto')}
            onBlur={handleBlur('puesto')}
          />
          {touched.puesto && !form.puesto?.trim() && (
            <div className="invalid-feedback">Este campo es obligatorio</div>
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Atrás
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmitPaso2}
          disabled={!canNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
