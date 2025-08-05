// src/services/api.js
import { auth } from '../firebaseClient'; // Cliente de Firebase Auth

const API_BASE = import.meta.env.VITE_API_URL;
const API_KEY  = import.meta.env.VITE_API_KEY;

// 🔹 Helper: obtiene headers con API Key + token Firebase
async function getAuthHeaders(isFormData = false) {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuario no autenticado');
  const token = await user.getIdToken();

  const headers = {
    'x-api-key': API_KEY,
    'Authorization': `Bearer ${token}`,
  };

  if (!isFormData) headers['Content-Type'] = 'application/json';
  return headers;
}

// 🔹 Crear estudio (con CV)
export async function createEstudio(formData) {
  const url = `${API_BASE}/api/estudios`;
  const headers = await getAuthHeaders(true);
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: formData
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// 🔹 Crear checkout
export async function crearCheckout(datos) {
  const url = `${API_BASE}/api/checkout`;
  const headers = await getAuthHeaders();
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(datos)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// 🔹 Borrar solicitud
export async function borrarSolicitud(clientId, docId) {
  const url = `${API_BASE}/api/estudios/${clientId}/${docId}`;
  const headers = await getAuthHeaders();
  const res = await fetch(url, {
    method: 'DELETE',
    headers
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
