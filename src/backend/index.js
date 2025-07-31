// index.js
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware base
app.use(cors());
app.use(express.json());

// Test DB
app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Errore nella connessione al DB:', err);
    res.status(500).json({ error: 'Errore nel ping del database' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('Streetcats backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
