// src/services/api.js

// Lee la URL base de la API de la variable de entorno VITE_API_URL
// y si no está definida, usa el dominio principal de producción:
const API_BASE = import.meta.env.VITE_API_URL || 'https://clientes.saxmexico.com';

/**
 * Crea un nuevo estudio: sube datos + CV + lanza Stripe Checkout
 * Llama a POST /api/estudios
 *
 * @param {Object} payload 
 * @returns {Promise<{ docId: string, cvUrl: string, checkoutUrl: string }>}
 */
export async function createEstudio(payload) {
  const url = `${API_BASE}/api/estudios`;
  console.log('🌐 [createEstudio]', url, payload);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('❌ [createEstudio] Error:', res.status, text);
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json(); // { ok, docId, cvUrl, checkoutUrl }
}

/**
 * Inicia el flujo de pago una vez creado el estudio
 * Llama a POST /api/checkout
 *
 * @param {{ docId: string, tipo: string, clientId?: string, cac?: number }} datos
 * @returns {Promise<{ checkoutUrl: string }>}
 */
export async function crearCheckout(datos) {
  const url = `${API_BASE}/api/checkout`;
  console.log('🌐 [crearCheckout]', url, datos);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('❌ [crearCheckout] Error:', res.status, text);
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json(); // { checkoutUrl }
}

/**
 * (Opcional) Obtiene todos los estudios si tienes GET /api/estudios
 */
export async function getEstudios() {
  const url = `${API_BASE}/api/estudios`;
  console.log('🌐 [getEstudios]', url);

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    console.error('❌ [getEstudios] Error:', res.status, text);
    throw new Error(`Error ${res.status}: ${text}`);
  }

  return res.json();
}
