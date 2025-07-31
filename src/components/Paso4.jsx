import React, { useState } from 'react';
import { crearCheckout } from '../services/api';

export default function Paso4({ form, onBack }) {
  const { visitorId, docId, tipo, nombre, apellido, nombreCandidato, puesto, cvUrl, cac = 0 } = form;
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const tipos = {
    estandar: { label: 'Estándar', precio: 500, plazo: '7 días hábiles' },
    urgente:  { label: 'Urgente', precio: 800, plazo: '3 días hábiles' }
  };

  const tipoInfo = tipos[tipo] || {};

  const handleCheckout = async () => {
    setError('');
    setLoading(true);

    try {
      if (!docId || !tipo) throw new Error('Faltan datos para iniciar el pago');

      const payload = {
        docId,
        tipo,
        clientId: visitorId,
        cac,
        nombreSolicitante: `${nombre} ${apellido}`.trim(),
      };

      const { checkoutUrl } = await crearCheckout(payload);
      if (!checkoutUrl) throw new Error('No se recibió checkoutUrl');

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('❌ Error al iniciar el pago:', err);
      setError('No se pudo iniciar el pago. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-4">Resumen antes de pagar</h4>

      {/* CV */}
      {cvUrl && (
        <div className="mb-3">
          <strong>CV enviado:</strong>{' '}
          <a href={cvUrl} target="_blank" rel="noopener noreferrer">Ver archivo</a>
        </div>
      )}

      {/* Nombre y puesto */}
      <div className="mb-2"><strong>Nombre candidato:</strong> {nombreCandidato}</div>
      <div className="mb-2"><strong>Puesto solicitado:</strong> {puesto}</div>

      {/* Tipo y detalles */}
      {tipo && (
        <div className="alert alert-info mt-3">
          <strong>Tipo:</strong> {tipoInfo.label} <br />
          <strong>Plazo:</strong> {tipoInfo.plazo} <br />
          <strong>Costo:</strong> ${tipoInfo.precio} MXN
        </div>
      )}

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
  );
}
