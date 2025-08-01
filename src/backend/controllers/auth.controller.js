
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import delle funzioni di repository
const authRepository = require('../repositories/auth.repo');

/**
 * Controller per il login dell'utente.
 * @param {Object} req - Oggetto della richiesta
 * @param {Object} res - Oggetto della risposta
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
      	const user = await authRepository.findUserByEmail(email);

      	if (!user) {
        	return res.status(401).json({ error: 'Email non trovata' });
      	}

      	const match = await bcrypt.compare(password, user.password);
      	if (!match) {
        	return res.status(401).json({ error: 'Password errata' });
      	}

      	const token = jwt.sign(
        	{ id: user.id, username: user.username, email: user.email },
        	process.env.JWT_SECRET,
        	{ expiresIn: '7d' }
      	);

      	res.status(201).json({ token });
    } catch (error) {
      	console.error('Errore nel login:', error);
      	res.status(500).json({ error: 'Errore interno del server' });
    }
};

/**
 * Controller per la registrazione dell'utente.
 * @param {Object} req - Oggetto della richiesta
 * @param {Object} res - Oggetto della risposta
 */
exports.register = async (req, res) => {
	const { username, email, password } = req.body;

	try{
		const existingEmail = await authRepository.findUserByEmail(email);
		if(existingEmail){
			return res.status(400).json({ error: 'Email già in uso' });
		}

		const existingUsername = await authRepository.findUserByUsername(username);
		if(existingUsername){
			return res.status(400).json({ error: 'Username già in uso' });
		}

		// Hash della password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Creazione nuovo utente
		const newUser = await authRepository.createUser(username, email, hashedPassword);

		// Creazione del token 
		const token = jwt.sign(
        	{ id: newUser.id, username: newUser.username, email: newUser.email },
        	process.env.JWT_SECRET,
        	{ expiresIn: '7d' }
      	);
		
		res.status(201).json({ token });

	}catch(error){
		console.error('Errore nella registrazione:', error);
    	res.status(500).json({ error: 'Errore interno del server' });
	}
}