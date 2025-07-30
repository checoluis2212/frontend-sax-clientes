const API_BASE = import.meta.env.VITE_API_URL || 'https://clientes.saxmexico.com';

export async function createEstudio(payload) {
  const url = `${API_BASE}/api/estudios`;
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await fetch(url, { method: 'POST', body: formData });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function crearCheckout(datos) {
  const url = `${API_BASE}/api/checkout`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
