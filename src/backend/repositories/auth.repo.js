const pool = require('../config/db');

// Import del model user
const User = require('../models/user');

/**
 * Cerca un utente a partire dalla sua email
 * @param {String} email - email dell'utente
 */
exports.findUserByEmail = async (email) => {
	const result = await pool.query('SELECT * FROM utente WHERE email = $1', [email]);
	return result.rows[0] || null;
};

/**
 * Cerca un utente a partire dal suo username
 * @param {String} username - username dell'utente
 */
exports.findUserByUsername = async (username) => {
	const result = await pool.query('SELECT * FROM utente WHERE username = $1', [username]);
	return result.rows[0] ? new User(result.rows[0]) : null;
};

// Crea un nuovo utente
exports.createUser = async (username, email, passwordHash) => {
	const result = await pool.query(
		`
		INSERT INTO utente (username, email, password, data_registrazione)
		VALUES ($1, $2, $3, NOW())
		RETURNING *
		`,
		[username, email, passwordHash]
	);

	return new User(result.rows[0]);
};