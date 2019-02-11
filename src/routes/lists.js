const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.post('/api/lists/create', listController.create);
router.get('/api/lists/:listId', listController.show);
router.post('/api/lists/:listId/update', listController.update);
router.post('/api/lists/:listId/destroy', listController.destroy);

module.exports = router;