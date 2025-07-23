const BACKEND = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function crearCheckout(datos) {
  const resp = await fetch(`${BACKEND}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })

  if (!resp.ok) throw new Error('No se pudo iniciar el pago')
  return await resp.json() // { checkoutUrl }
}
