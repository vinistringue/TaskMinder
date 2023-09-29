const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { DB_CONFIG } = require('../config'); // Configure seu arquivo de configuração

class UserModel {
  async createUser(username, password) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Hangloose12',
      database: 'taskminder',
    });
    try {
      // Hash da senha antes de armazená-la no banco de dados
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insere o usuário no banco de dados
      const [result] = await connection.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );

      return result.insertId;
    } catch (error) {
      throw error;
    } finally {
      connection.end();
    }
  }

  async getUserByUsername(username) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Hangloose12',
      database: 'taskminder',
    });
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      return rows[0];
    } catch (error) {
      throw error;
    } finally {
      connection.end();
    }
  }
}

module.exports = new UserModel();
