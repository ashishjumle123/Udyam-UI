// models/application.model.js

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    aadhaarNumber: {
        type: String,
        required: [true, 'Aadhaar number is required.'],
        unique: true, // Ensures no two documents have the same Aadhaar number
        match: [/^\d{12}$/, 'Please fill a valid 12-digit Aadhaar number.']
    },
    nameAsPerAadhaar: {
        type: String,
        required: [true, 'Name is required.']
    },
    organisationType: {
        type: String,
        required: [true, 'Organisation type is required.']
    },
    panNumber: {
        type: String,
        required: [true, 'PAN number is required.'],
        unique: true, // Ensures no two documents have the same PAN number
        uppercase: true, // Automatically converts PAN to uppercase
        match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please fill a valid PAN number.']
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const UdyamApplication = mongoose.model('UdyamApplication', applicationSchema);

module.exports = UdyamApplication;