import React, { useState } from 'react'
import { crearSesionPago } from '../services/api'

export default function Paso4({ form, onBack }) {
  const [loading, setLoading] = useState(false)
  const precios = { estandar: 50000, urgente: 80000 }
  const costo = precios[form.tipo] || 0

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { checkoutUrl } = await crearSesionPago({
        ...form,
        // si upload de CV lo subes aparte, envía sólo URL o nombre aquí
      })
      window.location.href = checkoutUrl
    } catch (err) {
      console.error(err)
      alert(err.message || 'Error al iniciar el pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Paso 4: Confirma tus datos</h4>

      <ul className="list-group mb-4">
        <li className="list-group-item">
          <strong>Nombre:</strong> {form.nombre} {form.apellido}
        </li>
        <li className="list-group-item">
          <strong>Empresa:</strong> {form.empresa}
        </li>
        <li className="list-group-item">
          <strong>Teléfono:</strong> {form.telefono}
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> {form.email}
        </li>
        <li className="list-group-item">
          <strong>CV:</strong> {form.cv?.name || 'No seleccionado'}
        </li>
        <li className="list-group-item">
          <strong>Tipo de estudio:</strong> {form.tipo}
        </li>
        <li className="list-group-item">
          <strong>Costo:</strong> ${(costo/100).toFixed(2)} MXN
        </li>
      </ul>

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={onBack} disabled={loading}>
          Atrás
        </button>
        <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Redirigiendo…' : 'Pagar'}
        </button>
      </div>
    </div>
  )
}
