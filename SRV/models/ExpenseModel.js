const db = require('../db');

class ExpenseModel {
    // Add a new expense
    static async addExpense(expense) {
      return new Promise((resolve, reject) => {
        const query = `INSERT INTO expenses (nom, montant, categorie, date, notes) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [expense.nom, expense.montant, expense.categorie, expense.date, expense.notes], function (err) {
          if (err) reject(err);
          resolve({ id: this.lastID, ...expense });
        });
      });
    }
  
    // Get all expenses
    static async getAllExpenses() {
      return new Promise((resolve, reject) => {
        db.all('SELECT * FROM expenses', [], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
    }
  
    // Get expense by ID
    static async getExpenseById(id) {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM expenses WHERE id = ?', [id], (err, row) => {
          if (err) reject(err);
          resolve(row);
        });
      });
    }
  
    // Delete an expense by ID
    static async deleteExpense(id) {
      return new Promise((resolve, reject) => {
        db.run('DELETE FROM expenses WHERE id = ?', [id], function (err) {
          if (err) reject(err);
          resolve({ deleted: this.changes });
        });
      });
    }
  }

  module.exports = ExpenseModel;