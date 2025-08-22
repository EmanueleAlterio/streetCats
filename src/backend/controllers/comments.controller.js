const commentsRepo = require('../repositories/comments.repo');

exports.createComment = async (req, res) => {
    try {
        const { testo, id_gatto } = req.body;
        const userId = req.user.id;

        if(!testo){ return res.status(400).json({ message: 'Il campo "testo" è obbligatorio' }); }
        
        if(!id_gatto){ return res.status(400).json({ message: 'Il post non esite' }); }

        const newComment = await commentsRepo.createComment({ testo, userId, id_gatto });
        
        res.status(201).json({ commento: newComment });

    } catch (error) {
        console.error('Errore nella creazione del commento:', error);
        res.status(500).json({ message: 'Errore nella creazione del commento' });
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const comment = req.comment; //validato dal middleware
        await commentsRepo.deleteComment(comment.id);
        res.status(200).json({ message: 'Commento eliminato correttamente' });
    } catch (error) {
        console.error('Errore nella rimozione del commento:', error);
        res.status(500).json({ message: 'Errore nella rimozione del commento' });
    }
}