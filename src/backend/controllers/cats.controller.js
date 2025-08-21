const catsRepo = require('../repositories/cats.repo');
const fs = require('fs');
const path = require('path');

exports.createPost = async (req, res) => {
    try {
        const { titolo, descrizione, latitudine, longitudine } = req.body;
        const foto_url = req.file ? `uploads/catfoto/${req.file.filename}` : null;
        const userId = req.user.id;

        const newCat = await catsRepo.createPost({ titolo, descrizione, foto_url, latitudine, longitudine, userId });

        res.status(201).json({ gatto: newCat });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore nella creazione del post' });          
    }
}

exports.deletePost = async (req, res) =>  {

    try {

        const post = req.post; //post validato dal middleware checkPostOwner

        // Cacella il post dal db
        await catsRepo.deletePost(req.post.id);

        // Cancella la foto da /uploads
        if (post.foto_url) {
            const fotoPath = path.join(__dirname, '..', post.foto_url);
            fs.unlink(fotoPath, (err) => {
                if (err) console.error('Errore nella rimozione della foto:', err);
            });
        }

        res.status(200).json({ message: 'Post eliminato correttamente' });

    } catch (error) {
        console.error('Errore nella rimozione del post:', error);
        res.status(500).json({ message: 'Errore interno del server '});
    }

}

exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await catsRepo.getPostById(postId);

        if (!post){ return res.status(404).json({ message: 'Post non trovato' }); }

        res.status(200).json({ gatto: post });

    } catch (error) {
        console.error('Errore nel recupero del post:', error);
        res.status(500).json({ message: 'Errore interno al server.' });
    }
}

exports.getLatestPosts = async (req, res) => {
    try {
        const posts = await catsRepo.getLatestPosts();
        res.status(200).json({ gatti: posts });
    
    } catch (error) {
        console.error('Errore nel recupero degli ultimi post:', error);
        res.status(500).json({ message: 'Errore interno al server.' });    
    }

}
