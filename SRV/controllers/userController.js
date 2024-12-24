const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'jinzo';

class UserController {
  // Register a new user
  static async register(req, res) {
    try {
      const { email } = req.body;

      // Check if the email already exists
      const existingUser = await UserModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered' });
      }

      // Create the user
      const userId = await UserModel.createUser(req.body);
      res.status(201).json({ id: userId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Login and generate a token
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      // Get user by email
      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Verify token middleware
  static verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Attach decoded user info to the request
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  }
}

module.exports = UserController;
