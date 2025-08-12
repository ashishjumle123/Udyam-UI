// routes/api.routes.js

const express = require('express');
const router = express.Router();
const UdyamApplication = require('../models/application.model');

// POST /api/submit
router.post('/submit', async (req, res) => {
    try {
        const { aadhaarNumber, nameAsPerAadhaar, organisationType, panNumber } = req.body;

        // Create a new application instance with the request data
        const newApplication = new UdyamApplication({
            aadhaarNumber,
            nameAsPerAadhaar,
            organisationType,
            panNumber
        });

        // Mongoose's .save() will automatically run the validation rules from the schema
        const savedApplication = await newApplication.save();

        res.status(201).json(savedApplication);

    } catch (error) {
        // Handle validation errors and duplicate key errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        // MongoDB duplicate key error code is 11000
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `An application with this ${field} already exists.` });
        }

        // For other unexpected errors
        res.status(500).json({ message: 'An unexpected error occurred on the server.' });
    }
});

module.exports = router;