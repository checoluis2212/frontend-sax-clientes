router.delete('/:clientId/:docId', async (req, res) => {
  try {
    const { clientId, docId } = req.params;
    const clientRef = db.collection('clientes').doc(clientId);
    const submissionRef = clientRef.collection('submissions').doc(docId);

    // Eliminar submission
    await submissionRef.delete();

    // Verificar si quedan otros submissions
    const remaining = await clientRef.collection('submissions').get();
    if (remaining.empty) {
      await clientRef.delete();
    }

    res.json({ ok: true });
  } catch (e) {
    console.error('❌ Error eliminando solicitud:', e);
    res.status(500).json({ ok: false, error: 'Error eliminando solicitud' });
  }
});
