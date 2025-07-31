const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * Rotta per il login di un utente.
 * @route POST /api/auth/login
 * @controller login - Controller per l'autenticazione dell'utente.
 */
router.post('/login', authController.login);

module.exports = router;
