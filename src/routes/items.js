const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/api/lists/:listId/items/create', itemController.create);
router.get('/api/lists/:listId/items', itemController.showItems)

module.exports = router;