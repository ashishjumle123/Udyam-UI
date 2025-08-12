const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');

router.post('/applications', applicationController.createApplication);
router.get('/applications', applicationController.getApplications);
router.get('/applications/:id', applicationController.getApplicationById);
router.delete('/applications/:id', applicationController.deleteApplication);

module.exports = router;
