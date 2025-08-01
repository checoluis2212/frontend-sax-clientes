// src/middleware/auth.js
const { admin } = require('../firebase');

module.exports = async function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const match  = header.match(/^Bearer (.+)$/);
  if (!match) {
    return res.status(401).json({ ok: false, error: 'No token provided' });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(match[1]);
    req.uid   = decoded.uid;
    req.email = decoded.email;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ ok: false, error: 'Invalid or expired token' });
  }
};
