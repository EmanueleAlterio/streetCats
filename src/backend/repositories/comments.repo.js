const db = require('../config/db');
const Comment = require('../models/comment');

exports.createComment = async ({ testo, userId, id_gatto }) => {
    const query = 'INSERT INTO commento (testo, id_utente, id_gatto) VALUES ($1, $2, $3) RETURNING *;';
    const values = [testo, userId, id_gatto];
    const result = await db.query(query, values);
    return new Comment(result.rows[0]);
}

exports.getCommentById = async (id) => {
    const query = 'SELECT * FROM commento WHERE id = $1;';
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0] ? new Comment(result.rows[0]) : null;
};

exports.deleteComment = async (id) => {
    const query = 'DELETE FROM commento WHERE id = $1;';
    const values = [id];
    await db.query(query, values);
};