// src/components/Paso4.jsx
import React, { useEffect } from 'react'
import { crearCheckout } from '../services/api' // ✅ función correcta

export default function Paso4({ form }) {
  useEffect(() => {
    const enviarDatos = async () => {
      try {
        const visitorId = localStorage.getItem('visitorId') || null
        const datos = { ...form, visitorId, tipo: form.tipo || 'estandar' }

        const { checkoutUrl } = await crearCheckout(datos)
        window.location.href = checkoutUrl
      } catch (err) {
        alert('Error al iniciar el pago')
        console.error(err)
      }
    }

    enviarDatos()
  }, [])

  return (
    <div className="container py-5">
      <h4 className="fw-bold">Redirigiendo a pasarela de pago…</h4>
      <p>Por favor espera un momento…</p>
    </div>
  )
}
