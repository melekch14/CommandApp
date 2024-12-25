const StatisticsModel = require('../models/StatisticsModel');

class StatisticsController {
  static async getTotalRevenue(req, res) {
    try {
      const totalRevenue = await StatisticsModel.getTotalRevenue();
      res.json({ totalRevenue });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getTopArticles(req, res) {
    try {
      const topArticles = await StatisticsModel.getTopArticles();
      res.json(topArticles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getExpensesByCategory(req, res) {
    try {
      const expensesByCategory = await StatisticsModel.getExpensesByCategory();
      res.json(expensesByCategory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getRevenueVsExpenses(req, res) {
    try {
      const revenueVsExpenses = await StatisticsModel.getRevenueVsExpenses();
      res.json(revenueVsExpenses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getExpensesTrend(req, res) {
    try {
      const expensesTrend = await StatisticsModel.getExpensesTrend();
      res.json(expensesTrend);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getGrowthRate(req, res) {
    try {
      // Fetch revenue or expenses data for the last two periods
      const data = await StatisticsModel.getExpensesGrowthData();

      if (data.length === 2) {
        const previousPeriod = data[1].total; // First period
        const currentPeriod = data[0].total;  // Second period

        // Calculate growth rate: ((currentPeriod - previousPeriod) / previousPeriod) * 100
        const growthRate = ((currentPeriod - previousPeriod) / previousPeriod) * 100;
        res.json({ growthRate: growthRate.toFixed(2) }); // Return the growth rate as a percentage
      } else {
        res.status(400).json({ error: 'Insufficient data to calculate growth rate.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProfitByMonth(req, res) {
    try {
      const profitData = await StatisticsModel.getProfitByMonth();
      res.json(profitData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = StatisticsController;
