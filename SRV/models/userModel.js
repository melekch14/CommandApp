const db = require('../db');
const bcrypt = require('bcrypt');

class UserModel {
  // Get user by email
  static async getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  // Create a new user with hashed password
  static async createUser(data) {
    const { nom, prenom, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)`,
        [nom, prenom, email, hashedPassword],
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }
}

module.exports = UserModel;
