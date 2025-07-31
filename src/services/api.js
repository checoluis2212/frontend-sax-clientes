const API_BASE = import.meta.env.VITE_API_URL || 'https://clientes.saxmexico.com';

// 🔹 Crear estudio
export async function createEstudio(payload) {
  const url = `${API_BASE}/api/estudios`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// 🔹 Crear checkout
export async function crearCheckout(datos) {
  const url = `${API_BASE}/api/checkout`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// 🔹 Borrar solicitud (cliente + submission)
export async function borrarSolicitud(clientId, docId) {
  const url = `${API_BASE}/api/estudios/${clientId}/${docId}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
