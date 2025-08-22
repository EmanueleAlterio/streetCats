const commentsRepo = require('../repositories/comments.repo');

module.exports = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;

        // Recupera il commento
        const comment = await commentsRepo.getCommentById(commentId);
        if(!comment){ return res.status(404).json({ message: 'Il commento non esiste' }); }

        if (comment.id_utente !== userId) { return res.status(403).json({ message: 'Non hai i permessi per eliminare questo commento' }); }

        // Passa il commento al controller
        req.comment = comment;
        next();

    } catch (error) {
        console.error('Errore nel middleware checkCommentOwner:', error);
        res.status(500).json({ message: 'Errore nel middleware' });
    }
}