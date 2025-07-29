// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware base
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Streetcats backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
