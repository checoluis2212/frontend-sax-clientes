import React, { useEffect } from 'react';
import { crearCheckout } from '../services/api';

export default function Paso4({ form, onBack }) {
  useEffect(() => {
    // Guardar solicitud pendiente en localStorage
    const solicitudPendiente = {
      docId: form.docId,
      cvUrl: form.cvUrl,
      nombreCandidato: form.nombreCandidato,
      ciudad: form.ciudad,        // 🔹 Agregamos ciudad
      puesto: form.puesto,
      tipo: form.tipo,
      amount: form.amount || 500, // Ajusta según tu lógica de precios
      pasoActual: 4
    };
    localStorage.setItem('solicitudPendiente', JSON.stringify(solicitudPendiente));
  }, [form]);

  const handleCheckout = async () => {
    const { checkoutUrl } = await crearCheckout({
      docId: form.docId,
      tipo: form.tipo,
      clientId: form.visitorId
    });
    localStorage.removeItem('solicitudPendiente'); // Limpiar al pagar
    window.location.href = checkoutUrl;
  };

  return (
    <div className="container py-5">
      <h4>Resumen antes de pagar</h4>
      <p>CV enviado: <a href={form.cvUrl} target="_blank" rel="noreferrer">Ver archivo</a></p>
      <p>Nombre candidato: {form.nombreCandidato}</p>
      <p>Ciudad: {form.ciudad}</p> {/* 🔹 Mostrar ciudad */}
      <p>Puesto solicitado: {form.puesto}</p>
      <p>Tipo: {form.tipo}</p>
      <p>Costo: ${form.amount} MXN</p>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={onBack}>Atrás</button>
        <button className="btn btn-primary" onClick={handleCheckout}>Ir a pagar</button>
      </div>
    </div>
  );
}
