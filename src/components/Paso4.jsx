// src/components/Paso4.jsx
import React, { useState } from 'react'
import { crearCheckout } from '../services/api' // tu helper que hace POST /api/checkout

export default function Paso4({ form, onBack }) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleCheckout = async () => {
    setError('')
    setLoading(true)
    try {
      const visitorId = localStorage.getItem('visitorId') || null

      const payload = {
        docId:              form.docId,
        tipo:               form.tipo || 'estandar',
        visitorId,
        nombreSolicitante:  `${form.nombre} ${form.apellido}`.trim(),
        nombreCandidato:    form.nombreCandidato || 'Candidato no especificado',
        // Incluye aquí cualquier otro campo que tu backend necesite…
      }

      const { checkoutUrl } = await crearCheckout(payload)

      // ── Limpieza de localStorage ───────────────────────────
      localStorage.removeItem('pedirEstudioStep')
      localStorage.removeItem('estudioDocId')
      localStorage.removeItem('estudioCvUrl')
      // Opcional: localStorage.removeItem('visitorId')

      // ── Redirigir a Stripe ─────────────────────────────────
      window.location.href = checkoutUrl
    } catch (err) {
      console.error('❌ Error al iniciar el pago:', err)
      setError('No se pudo iniciar el pago. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <h4 className="fw-bold">Redirigiendo a pasarela de pago…</h4>
      <p>Cuando estés listo, pulsa el botón:</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={onBack}
          disabled={loading}
        >
          Atrás
        </button>
        <button
          className="btn btn-primary"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Cargando…' : 'Ir a pagar'}
        </button>
      </div>
    </div>
  )
}
