require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Test della connessione appena si crea il pool
pool.connect()
  .then(client => {
    console.log('Database connesso correttamente');
    client.release();  // libera il client subito dopo il test
  })
  .catch(err => {
    console.error('Errore nella connessione al database:', err);
  });

module.exports = pool;
