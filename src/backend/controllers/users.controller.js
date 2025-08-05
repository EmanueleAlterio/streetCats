const userRepo = require('../repositories/users.repo');
const fs = require('fs').promises;
const path = require('path');

exports.getUserById = async function (req, res) {
	try {
		const userId = req.params.id;
		const user = await userRepo.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'Utente non trovato' });
		}

		// Rimuove dati sensibili come passwordHash
		const { passwordHash, ...safeUser } = user;
		res.json(safeUser);
		
	} catch (error) {
		console.error('Errore nel controller utente:', error);
		res.status(500).json({ error: 'Errore server' });
	}
};


exports.uploadProfileImage = async (req, res) => {
	try {
		const userId = req.user.id;
		const filePath = req.file.path;

		await userRepo.updateProfileImage(userId, filePath);

		res.json({ message: 'Immagine aggiornata', filePath });
	} catch (err) {
		console.error('Errore nel caricamento immagine:', err);
		res.status(500).json({ error: 'Errore server' });
	}
};


exports.removeProfileImage = async (req, res) => {
	try {
		const userId = req.user.id;

		const user = await userRepo.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'Utente non trovato' });
		}

		const fotoProfilo = user?.fotoProfilo;

		if (fotoProfilo) {
			const filePath = path.join(__dirname, '..', fotoProfilo);
			try {
				await fs.access(filePath); // Verifica se il file esiste
				await fs.unlink(filePath); // Elimina il file
			} catch (err) {
				console.warn(`File non trovato o già rimosso: ${filePath}`);
			}
		}

		await userRepo.removeProfileImage(userId);

		res.status(200).json({ success: true });

	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Errore durante la rimozione dell\'immagine' });
	}
}

