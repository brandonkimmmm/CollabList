const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/users', userController.create);
router.post('/api/users/signin', userController.signin);
router.get('/api/users/isAuthenticated', userController.isAuth);
router.get('/api/users/signout', userController.signout);
router.get('/api/users/:id/lists', userController.showLists);

module.exports = router;