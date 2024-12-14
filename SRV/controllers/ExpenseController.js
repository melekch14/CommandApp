const ExpenseModel = require('../models/ExpenseModel');

class ExpenseController {
    // Add a new expense
    static async addExpense(req, res) {
      try {
        const expense = req.body;
        const newExpense = await ExpenseModel.addExpense(expense);
        res.status(201).json(newExpense);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    // Get all expenses
    static async getAllExpenses(req, res) {
      try {
        const rows = await ExpenseModel.getAllExpenses();
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    // Get expense by ID
    static async getExpenseById(req, res) {
      try {
        const id = req.params.id;
        const expense = await ExpenseModel.getExpenseById(id);
        if (expense) {
          res.json(expense);
        } else {
          res.status(404).json({ error: 'Expense not found' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    // Delete an expense
    static async deleteExpense(req, res) {
      try {
        const id = req.params.id;
        const result = await ExpenseModel.deleteExpense(id);
        if (result.deleted) {
          res.json({ message: 'Expense deleted successfully' });
        } else {
          res.status(404).json({ error: 'Expense not found' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  }

  module.exports = ExpenseController