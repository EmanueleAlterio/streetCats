const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Importazione delle rotte dell'applicazione
const authRoutes = require('./routes/auth.routes');

// Middleware base
app.use(cors());
app.use(express.json());

// Configurazione sessione
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Definizione rotte
app.use('/api/auth', authRoutes);

// Middleware di gestione degli errori
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// Test route
app.get('/', (req, res) => {
  res.send('Streetcats backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
