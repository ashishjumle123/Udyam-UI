// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from .env file

const apiRoutes = require('./routes/api.routes');

const app = express();
const PORT = process.env.PORT || 8000;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON requests

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to MongoDB.');
}).catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process if DB connection fails
});

// --- API Routes ---
app.use('/api', apiRoutes);

// --- Root Route for Testing ---
app.get('/', (req, res) => {
    res.send('Udyam Registration Backend (Node.js) is running.');
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});