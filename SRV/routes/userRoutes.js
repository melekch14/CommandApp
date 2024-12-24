const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Auth routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Example of a protected route
router.get('/protected', UserController.verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
