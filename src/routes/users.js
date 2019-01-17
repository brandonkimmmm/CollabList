const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/users', userController.create);
router.post('/api/users/signin', userController.signin);

module.exports = router;