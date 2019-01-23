const express = require('express');
const router = express.Router();
const staticController = require('../controllers/staticController');

router.get('/api/', staticController.index);

module.exports = router;