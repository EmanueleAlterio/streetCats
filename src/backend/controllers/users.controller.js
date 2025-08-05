const userRepo = require('../repositories/users.repo');

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
