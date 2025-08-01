// src/components/Paso4.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearCheckout } from '../services/api';

export default function Paso4({ form, mensajeCancelado, onBack, onFinish }) {
  const navigate = useNavigate();

  // Array idéntico al de Paso3
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
  const seleccionado = tipos.find(t => t.value === form.tipo) || tipos[0];

  // Guardar estado pendiente tal cual lo tenías
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

  // Maneja el checkout (igual que antes)
  const handleCheckout = async () => {
    const { checkoutUrl } = await crearCheckout({
      docId:    form.docId,
      tipo:     seleccionado.value,
      clientId: form.visitorId,
    });
    window.location.href = checkoutUrl;
  };

  // ESTE es el único cambio: lleva al usuario al index (/) sin romper tu lógica
  const handleNuevaVacante = () => {
    // opcional: limpia el storage
    localStorage.removeItem('solicitudPendiente');
    // redirige al home de vacantes
    navigate('/', { replace: true });
  };

  return (
    <div className="container py-5">
      <h4 className="mb-4 fw-bold">Resumen antes de pagar</h4>

      {mensajeCancelado && (
        <div className="alert alert-warning">{mensajeCancelado}</div>
      )}

      <p>
        <strong>CV enviado:</strong>{' '}
        <a href={form.cvUrl} target="_blank" rel="noreferrer">Ver archivo</a>
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
