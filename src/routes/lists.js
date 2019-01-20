const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.post('/api/lists/create', listController.create);
router.get('/api/lists/:listId', listController.show);

module.exports = router;