const catsRepo = require('../repositories/cats.repo');

module.exports = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        // Recupera il post dal database
        const post = await catsRepo.getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trovato' });
        }

        // Controlla che l'utente autenticato sia il proprietario
        if (post.id_utente !== userId) {
            return res.status(403).json({ message: 'Non hai i permessi per eliminare questo post' });
        }

        // Salva il post in req per usarlo nel controller
        req.post = post;
        next();
    } catch (error) {
        console.error('Errore nel middleware checkPostOwner:', error);
        res.status(500).json({ message: 'Errore nel controllo proprietà del post' });
    }
};
