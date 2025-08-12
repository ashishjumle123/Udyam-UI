const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.routes');

const app = express();
const PORT = process.env.PORT || 8000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Successfully connected to MongoDB.');
}).catch(err => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
});

// --- Routes ---
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Udyam Registration Backend is running.');
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
