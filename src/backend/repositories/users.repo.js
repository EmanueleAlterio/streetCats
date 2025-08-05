const db = require('../config/db');
const User = require('../models/user');

exports.findById = async function (id) {
	const result = await db.query('SELECT * FROM utente WHERE id = $1', [id]);

	if (!result.rows || result.rows.length === 0) return null;

	return new User(result.rows[0]);
};

exports.updateProfileImage = async function (id, filePath) {
  	await db.query('UPDATE utente SET foto_profilo = $1 WHERE id = $2', [filePath, id]);
};

exports.removeProfileImage = async function (id) {
	await db.query('UPDATE utente SET foto_profilo = NULL WHERE id = $1', [id]);
}
