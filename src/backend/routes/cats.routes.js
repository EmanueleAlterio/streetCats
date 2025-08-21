const express = require('express');
const router = express.Router();

const catController = require('../controllers/cats.controller');
const authMiddleware = require('../middleware/authmiddleware');
const checkPostOwner = require('../middleware/checkPostOwner');
const uploadCatFoto = require('../config/uploadsCatFoto');

// Rotta per crare un nuovo post
router.post('/add-cats', authMiddleware, uploadCatFoto.single('foto'), catController.createPost);

// Rotta per eliminare un post
router.delete('/delete/:id', authMiddleware, checkPostOwner, catController.deletePost);

// Rotta per recuperare gli ultimi post caricati
router.get('/cat/latest', catController.getLatestPosts);

// Rotta per recuperare un post tramite id
router.get('/cat/:id', catController.getPostById);


module.exports = router;
