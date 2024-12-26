const db = require('../db');

class StatisticsModel {

  static async getTotalRevenue() {
    return new Promise((resolve, reject) => {
      const query = `SELECT SUM(price) as totalRevenue FROM articles`;
      db.get(query, (err, row) => {
        if (err) reject(err);
        resolve(row?.totalRevenue || 0);
      });
    });
  }

  static async getTopArticles() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT name, COUNT(*) as count
        FROM articles
        GROUP BY name
        ORDER BY count DESC
        LIMIT 5
      `;
      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static async getExpensesByCategory() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT categorie, SUM(montant) as total
        FROM expenses
        GROUP BY categorie
      `;
      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static async getRevenueVsExpenses() {
    return new Promise((resolve, reject) => {
      const revenueQuery = `SELECT SUM(price) as totalRevenue FROM articles`;
      const expensesQuery = `SELECT SUM(montant) as totalExpenses FROM expenses`;

      db.get(revenueQuery, (err, revenueRow) => {
        if (err) reject(err);

        db.get(expensesQuery, (err, expensesRow) => {
          if (err) reject(err);

          resolve({
            totalRevenue: revenueRow?.totalRevenue || 0,
            totalExpenses: expensesRow?.totalExpenses || 0,
            netProfit: (revenueRow?.totalRevenue || 0) - (expensesRow?.totalExpenses || 0),
          });
        });
      });
    });
  }

  static async getExpensesTrend() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT strftime('%Y-%m', date) as month, SUM(montant) as total
        FROM expenses
        GROUP BY month
        ORDER BY month ASC
      `;
      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static async getExpensesGrowthData() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT SUM(montant) AS total, strftime('%Y-%m', date) AS period
        FROM expenses
        WHERE date >= DATE('now', '-2 months')
        GROUP BY period
        ORDER BY period DESC
        LIMIT 2
      `;

      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static async getProfitByMonth() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          strftime('%Y-%m', c.date) AS month,
          SUM(a.price) AS revenue,
          IFNULL(SUM(e.montant), 0) AS expenses,
          SUM(a.price) - IFNULL(SUM(e.montant), 0) AS profit
        FROM articles a
        LEFT JOIN commands c ON a.command_id = c.id
        LEFT JOIN expenses e ON strftime('%Y-%m', c.date) = strftime('%Y-%m', e.date)
        GROUP BY month
        ORDER BY month
      `;

      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static async getGrossMargin() {
    return new Promise((resolve, reject) => {
      const revenueQuery = `SELECT SUM(price) as totalRevenue FROM articles`;
      const expensesQuery = `SELECT SUM(montant) as totalExpenses FROM expenses`;

      db.get(revenueQuery, (err, revenueRow) => {
        if (err) return reject(err);

        const totalRevenue = revenueRow?.totalRevenue || 0;

        db.get(expensesQuery, (err, expensesRow) => {
          if (err) return reject(err);

          const totalExpenses = expensesRow?.totalExpenses || 0;
          const netProfit = totalRevenue - totalExpenses;
          const grossMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

          resolve({ totalRevenue, totalExpenses, netProfit, grossMargin });
        });
      });
    });
  }

}

module.exports = StatisticsModel;
