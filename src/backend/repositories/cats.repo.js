const db = require('../config/db');

// Import del model Cat
const Cats = require('../models/cat');

exports.createPost = async ({ titolo, descrizione, foto_url, latitudine, longitudine, userId }) => {
    const query = 
    `INSERT INTO gatto (titolo, descrizione, foto_url, latitudine, longitudine, id_utente)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`;

    const values = [titolo, descrizione, foto_url, latitudine, longitudine, userId];
    const result = await db.query(query, values);
    return new Cats(result.rows[0]);
};

exports.getPostById = async (id) => {
    const query = 'SELECT * FROM gatto WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
};

exports.deletePost = async (postId) => {
    const query = `DELETE FROM gatto WHERE id = $1`;
    await db.query(query, [postId]);
};

exports.getPostById = async (id) => {
    const query = `SELECT * FROM gatto WHERE id = $1;`;
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) return null;
    return new Cats(result.rows[0]);
};

exports.getLatestPosts = async () => {
    const query = ` SELECT * FROM gatto ORDER BY data_inserimento DESC LIMIT 5; `;
    const result = await db.query(query);
    return result.rows.map(row => new Cats(row));
};


