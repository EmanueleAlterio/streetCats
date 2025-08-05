const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authmiddleware');
const userController = require('../controllers/users.controller');

router.get('/:id', authMiddleware, userController.getUserById);

module.exports = router;
