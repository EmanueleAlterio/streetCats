const express = require('express');
const router = express.Router();

const upload = require('../config/multer.config');
const authMiddleware = require('../middleware/authmiddleware');
const userController = require('../controllers/users.controller');

// Rotta per recuperare il profilo utente tramite id
router.get('/:id', authMiddleware, userController.getUserById);

// Rotta per aggiornare la foto profilo
router.post('/upload-profile-image', authMiddleware, upload.single('fotoProfilo'), userController.uploadProfileImage);

// Rotta per rimuovere la foto profilo
router.delete('/remove-profile-image', authMiddleware, userController.removeProfileImage)


module.exports = router;
