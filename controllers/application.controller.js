const Application = require('../models/application.model');

// Create new application
exports.createApplication = async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        await newApplication.save();
        res.status(201).json({ message: '✅ Application created successfully', data: newApplication });
    } catch (error) {
        res.status(400).json({ message: '❌ Failed to create application', error: error.message });
    }
};

// Get all applications
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: '❌ Failed to fetch applications', error: error.message });
    }
};

// Get single application by ID
exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: '❌ Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: '❌ Failed to fetch application', error: error.message });
    }
};

// Delete application
exports.deleteApplication = async (req, res) => {
    try {
        const deleted = await Application.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: '❌ Application not found' });
        }
        res.status(200).json({ message: '✅ Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: '❌ Failed to delete application', error: error.message });
    }
};
