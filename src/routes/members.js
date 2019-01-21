const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.post('/api/lists/:listId/members/create', memberController.new);
router.post('/api/lists/:listId/members/:id/destroy', memberController.destroy);

module.exports = router;