const express = require('express');
const StatisticsController = require('../controllers/StatisticsController');
const router = express.Router();

router.get('/total-revenue', StatisticsController.getTotalRevenue);
router.get('/top-articles', StatisticsController.getTopArticles);
router.get('/expenses-by-category', StatisticsController.getExpensesByCategory);
router.get('/revenue-expenses', StatisticsController.getRevenueVsExpenses);
router.get('/expenses-trend', StatisticsController.getExpensesTrend);
router.get('/growth-rate', StatisticsController.getGrowthRate);
router.get('/profit-by-month', StatisticsController.getProfitByMonth);

module.exports = router;
