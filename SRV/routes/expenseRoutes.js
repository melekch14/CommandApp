const express = require('express');
const ExpenseController = require('../controllers/ExpenseController');

const router = express.Router();

router.get('/', ExpenseController.getAllExpenses);
router.post('/', ExpenseController.addExpense);

module.exports = router;
