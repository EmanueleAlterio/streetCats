const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * Rotta per il login di un utente.
 * @route POST /api/auth/login
 * @controller login - Controller per l'accesso dell'utente.
 */
router.post('/login', authController.login);

/**
 * Rotta per la registrazione di un utente.
 * @route POST /api/auth/register
 * @controller register - Controller per la registrazione dell'utente.
 */
router.post('/register', authController.register);

module.exports = router;
