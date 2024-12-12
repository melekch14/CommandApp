const db = require('../db');

class CommandModel {
  // Get all commands
  static async getAllCommands() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM commands', [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  // Get command by ID
  static async getCommandById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM commands WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  // Create a command with articles
  static async createCommandWithArticles(data) {
    const { nom, prenom, adresse, telephone, note, articles } = data;

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO commands (nom, prenom, adresse, telephone, note) VALUES (?, ?, ?, ?, ?)`,
        [nom, prenom, adresse, telephone, note],
        function (err) {
          if (err) return reject(err);

          const commandId = this.lastID;

          // Insert articles into the articles table
          const placeholders = articles.map(() => '(?, ?, ?)').join(', ');
          const articleData = articles.flatMap(article => [commandId, article.name, article.price]);

          db.run(
            `INSERT INTO articles (command_id, name, price) VALUES ${placeholders}`,
            articleData,
            function (err) {
              if (err) return reject(err);
              resolve(commandId);
            }
          );
        }
      );
    });
  }

  // Update a command by ID
  static async updateCommand(id, data) {
    const { nom, prenom, adresse, telephone, note } = data;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE commands SET nom = ?, prenom = ?, adresse = ?, telephone = ?, note = ? WHERE id = ?`,
        [nom, prenom, adresse, telephone, note, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  // Delete a command by ID
  static async deleteCommand(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM commands WHERE id = ?`, [id], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  // Delete articles by command ID
  static async deleteArticlesByCommandId(commandId) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM articles WHERE command_id = ?`, [commandId], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static async getCommandWithArticles() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT c.id AS command_id, c.nom, c.prenom, c.adresse, c.telephone, c.note, 
               a.id AS article_id, a.name AS article_name, a.price AS article_price
        FROM commands c
        LEFT JOIN articles a ON c.id = a.command_id`;

      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // Format the data: Group articles under their respective command
          const command = {
            command_id: rows[0]?.command_id,
            nom: rows[0]?.nom,
            prenom: rows[0]?.prenom,
            adresse: rows[0]?.adresse,
            telephone: rows[0]?.telephone,
            note: rows[0]?.note,
            articles: rows.map(row => ({
              article_id: row.article_id,
              name: row.article_name,
              price: row.article_price
            }))
          };
          resolve(command);
        }
      });
    });
  }

}

module.exports = CommandModel;
