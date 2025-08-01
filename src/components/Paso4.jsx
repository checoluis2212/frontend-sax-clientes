// src/components/Paso4.jsx
import React, { useEffect } from 'react';

export default function Paso4({ form, mensajeCancelado, onBack, onReset, crearCheckout }) {
  // 1) Mismo array de tipos que Paso3
  const tipos = [
    {
      value: 'estandar',
      label:       'Estándar ($500 MXN)',
      amount:      500,
      description: 'Entrega en 7 días hábiles',
    },
    {
      value: 'urgente',
      label:       'Urgente ($800 MXN)',
      amount:      800,
      description: 'Entrega en 3 días hábiles',
    },
  ];

  // 2) Selección de la opción
  const seleccionado = tipos.find(t => t.value === form.tipo) || tipos[0];

  // 3) Guardar estado pendiente con amount y description
  useEffect(() => {
    const solicitudPendiente = {
      docId:       form.docId,
      cvUrl:       form.cvUrl,
      nombreCandidato: form.nombreCandidato,
      ciudad:      form.ciudad,
      puesto:      form.puesto,
      tipo:        seleccionado.value,
      amount:      seleccionado.amount,
      description: seleccionado.description,
      pasoActual:  4,
    };
    localStorage.setItem('solicitudPendiente', JSON.stringify(solicitudPendiente));
  }, [
    form.docId,
    form.cvUrl,
    form.nombreCandidato,
    form.ciudad,
    form.puesto,
    seleccionado.value,
    seleccionado.amount,
    seleccionado.description
  ]);

  // 4) Manejador de pago (se provee creación de checkout como prop)
  const handleCheckout = async () => {
    const { checkoutUrl } = await crearCheckout({
      docId:    form.docId,
      tipo:     seleccionado.value,
      clientId: form.visitorId,
    });
    window.location.href = checkoutUrl;
  };

  // 5) Botón “Iniciar nueva vacante”
  const handleNuevaVacante = () => {
    localStorage.removeItem('solicitudPendiente');
    onReset();  // vuelve al paso 0 en el wizard sin tocar rutas
  };

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Resumen antes de pagar</h4>

      {mensajeCancelado && (
        <div className="alert alert-warning">{mensajeCancelado}</div>
      )}

      <p>
        <strong>CV enviado:</strong>{' '}
        <a href={form.cvUrl} target="_blank" rel="noreferrer">
          Ver archivo
        </a>
      </p>
      <p><strong>Nombre candidato:</strong> {form.nombreCandidato}</p>
      <p><strong>Ciudad:</strong> {form.ciudad}</p>
      <p><strong>Puesto solicitado:</strong> {form.puesto}</p>

      <div className="alert alert-info">
        <p><strong>Tipo de estudio:</strong> {seleccionado.label}</p>
        <p><strong>Plazo:</strong> {seleccionado.description}</p>
        <p><strong>Costo:</strong> ${seleccionado.amount} MXN</p>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-secondary"
          onClick={onBack}
        >
          Atrás
        </button>
        <div>
          <button
            className="btn btn-danger me-2"
            onClick={handleNuevaVacante}
          >
            Iniciar nueva vacante
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCheckout}
          >
            {mensajeCancelado ? 'Reintentar pago' : 'Ir a pagar'}
          </button>
        </div>
      </div>
    </div>
  );
}
