const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.post('/api/lists/create', listController.create);

module.exports = router;