const express = require('express');
const router = express.Router();

const usersController = require('../controllers/userController');

// Routes users
router.post('/signUp', usersController.register);
router.post('/signIn', usersController.login);
router.get('/', usersController.dashboard);

module.exports = router;