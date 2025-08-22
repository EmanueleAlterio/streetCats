const express = require('express');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Importazione delle rotte dell'applicazione
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const catRoutes = require('./routes/cats.routes');
const commentRoutes = require('./routes/comments.routes');

// --- Middleware di sicurezza ---
// Helmet per impostare header sicuri
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", "http://localhost:3001"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginResourcePolicy: { policy: "same-origin" },
  })
);

// --- Permette immagini cross-origin solo per /uploads ---
app.use(
	'/uploads',
	helmet({
		crossOriginResourcePolicy: { policy: 'cross-origin' }, 
	}),
	express.static('uploads')
);


// CORS
app.use(cors());

// Parsing del body
app.use(express.json());


// Configurazione sessione
app.use(session({
	secret: process.env.JWT_SECRET,
	resave: false,
	saveUninitialized: false
}));

// Definizione rotte
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/posts', catRoutes);
app.use('/api/comments', commentRoutes)


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
