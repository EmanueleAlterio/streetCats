const db = require('../config/db');
const User = require('../models/user');

exports.findById = async function (id) {
	const result = await db.query('SELECT * FROM utente WHERE id = $1', [id]);

	if (!result.rows || result.rows.length === 0) return null;

	return new User(result.rows[0]);
};
