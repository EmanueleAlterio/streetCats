const express = require('express');
const router = express.Router();

const upload = require('../config/multer.config');
const authMiddleware = require('../middleware/authmiddleware');
const userController = require('../controllers/users.controller');

router.get('/:id', authMiddleware, userController.getUserById);
router.post('/upload-profile-image', authMiddleware, upload.single('fotoProfilo'), userController.uploadProfileImage);
router.delete('/remove-profile-image', authMiddleware, userController.removeProfileImage)


module.exports = router;
