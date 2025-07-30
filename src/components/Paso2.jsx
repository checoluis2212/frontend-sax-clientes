// src/components/Paso2.jsx
import React, { useState } from 'react';

export default function Paso2({ form, setForm, onBack, onNext }) {
  const [touched,    setTouched]    = useState({ cv:false, nombreCandidato:false, ciudad:false, puesto:false });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };
  const handleBlur   = (field) => () => {
    setTouched(t => ({ ...t, [field]: true }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0] || null;
    setTouched(t => ({ ...t, cv: true }));
    setForm(f => ({ ...f, cv: file }));
  };

  const API_BASE = import.meta.env.VITE_API_URL || '';

  const canNext = form.cv
    && form.nombreCandidato?.trim()
    && form.ciudad?.trim()
    && form.puesto?.trim();

  const handleSubmitPaso2 = async () => {
    setSubmitting(true);
    setSubmitError('');

    try {
      const fd = new FormData();
      // Incluimos visitorId
      fd.append('visitorId', form.visitorId);
      // Campos del candidato
      fd.append('cv', form.cv, form.cv.name);
      fd.append('nombreCandidato', form.nombreCandidato);
      fd.append('ciudad', form.ciudad);
      fd.append('puesto', form.puesto);

      const res = await fetch(`${API_BASE}/api/estudios`, {
        method: 'POST',
        body: fd
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const { docId, cvUrl } = data;

      setForm(f => ({ ...f, docId, cvUrl }));
      onNext();
    } catch (err) {
      console.error('❌ Error al enviar estudio:', err);
      setSubmitError('No se pudo enviar la información. Por favor, intenta de nuevo más tarde.');
    } finally {
      setSubmitting(false);
    }
  };

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
            Debes seleccionar un archivo (.pdf, .doc o .docx)
          </div>
        )}
      </div>

      {/* Nombre completo */}
      <div className="mb-3">
        <label className="form-label">Nombre completo del candidato</label>
        <input
          type="text"
          className={`form-control ${touched.nombreCandidato && !form.nombreCandidato?.trim() ? 'is-invalid' : ''}`}
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
            className={`form-control ${touched.ciudad && !form.ciudad?.trim() ? 'is-invalid' : ''}`}
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
            className={`form-control ${touched.puesto && !form.puesto?.trim() ? 'is-invalid' : ''}`}
            value={form.puesto || ''}
            onChange={handleChange('puesto')}
            onBlur={handleBlur('puesto')}
          />
          {touched.puesto && !form.puesto?.trim() && (
            <div className="invalid-feedback">Este campo es obligatorio</div>
          )}
        </div>
      </div>

      {submitError && (
        <div className="alert alert-danger mt-4">{submitError}</div>
      )}

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={onBack} disabled={submitting}>
          Atrás
        </button>
        <button className="btn btn-primary" onClick={handleSubmitPaso2} disabled={!canNext || submitting}>
          {submitting ? 'Enviando…' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}
