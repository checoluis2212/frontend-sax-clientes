import React, { useState } from 'react';
import { crearCheckout } from '../services/api';

export default function Paso4({ form, onBack }) {
  const { visitorId, docId, tipo, nombre, apellido, cac = 0 } = form;
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleCheckout = async () => {
    setError('');
    setLoading(true);

    try {
      console.log('DEBUG Paso4 form:', form);

      if (!docId || !tipo) {
        throw new Error('Faltan datos para iniciar el pago (docId/tipo)');
      }

      const payload = {
        docId,
        tipo,
        clientId: visitorId,
        cac,
        nombreSolicitante: `${nombre} ${apellido}`.trim(),
      };

      console.log('DEBUG Paso4 payload checkout:', payload);
      const { checkoutUrl } = await crearCheckout(payload);

      if (!checkoutUrl) {
        throw new Error('No se recibió checkoutUrl');
      }

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
  );
}
