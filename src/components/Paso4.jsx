import React, { useEffect } from 'react';
import { crearCheckout } from '../services/api';

export default function Paso4({ form, onBack, onFinish }) {
  useEffect(() => {
    const solicitudPendiente = {
      docId: form.docId,
      cvUrl: form.cvUrl,
      nombreCandidato: form.nombreCandidato,
      ciudad: form.ciudad,
      puesto: form.puesto,
      tipo: form.tipo,
      amount: form.amount || 500,
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
    localStorage.removeItem('solicitudPendiente');
    window.location.href = checkoutUrl;
  };

  const handleNueva = () => {
    localStorage.removeItem('solicitudPendiente');
    onFinish();
  };

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Resumen antes de pagar</h4>

      <p><strong>CV enviado:</strong> <a href={form.cvUrl} target="_blank" rel="noreferrer">Ver archivo</a></p>
      <p><strong>Nombre candidato:</strong> {form.nombreCandidato}</p>
      <p><strong>Ciudad:</strong> {form.ciudad}</p>
      <p><strong>Puesto solicitado:</strong> {form.puesto}</p>

      <div className="alert alert-info">
        <strong>Tipo:</strong> {form.tipo || 'Estándar'}<br />
        <strong>Plazo:</strong> 7 días hábiles<br />
        <strong>Costo:</strong> ${form.amount || 500} MXN
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={onBack}>Atrás</button>
        <div>
          <button className="btn btn-danger me-2" onClick={handleNueva}>Iniciar solicitud nueva</button>
          <button className="btn btn-primary" onClick={handleCheckout}>Ir a pagar</button>
        </div>
      </div>
    </div>
  );
}
