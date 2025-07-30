// src/components/Paso4.jsx
import React, { useState } from 'react'
import { crearCheckout } from '../services/api'
import { useVisitorId }    from '../hooks/useVisitorId'

export default function Paso4({ form, onBack }) {
  const visitorId = useVisitorId()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleCheckout = async () => {
    setError('')
    setLoading(true)
    try {
      const payload = {
        docId:             form.docId,
        tipo:              form.tipo || 'estandar',
        clientId:          visitorId,
        cac:               form.cac || 0,
        nombreSolicitante: `${form.nombre} ${form.apellido}`.trim(),
      }
      const { checkoutUrl } = await crearCheckout(payload)
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
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={onBack} disabled={loading}>
          Atrás
        </button>
        <button className="btn btn-primary" onClick={handleCheckout} disabled={loading}>
          {loading ? 'Cargando…' : 'Ir a pagar'}
        </button>
      </div>
    </div>
  )
}
