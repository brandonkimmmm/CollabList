const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/api/lists/:listId/items/create', itemController.create);

module.exports = router;