const pool = require('../config/db');

exports.findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM utente WHERE email = $1', [email]);
  return result.rows[0] || null;
};
