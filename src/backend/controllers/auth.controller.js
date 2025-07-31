// controllers/auth.controller.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import delle funzioni di repository
const authRepository = require('../repositories/auth.repo');

/**
 * Controller per l'autenticazione dell'utente.
 * @param {Object} req - Oggetto della richiesta Express
 * @param {Object} res - Oggetto della risposta Express
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Email non trovata' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Password errata' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Errore nel login:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
};
