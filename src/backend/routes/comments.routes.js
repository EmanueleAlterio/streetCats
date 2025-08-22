const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');
const authMiddleware = require('../middleware/authmiddleware');
const checkCommentOwner = require('../middleware/checkCommentOwner');

// Rotta per creare un nuovo commento
router.post('/add-comment', authMiddleware, commentsController.createComment);

// Rotta per rimuovere un commento tramite id
router.delete('/delete/:id', authMiddleware, checkCommentOwner, commentsController.deleteComment);

module.exports = router;