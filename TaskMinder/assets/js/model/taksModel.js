const mysql = require('mysql2/promise');
const { DB_CONFIG } = require('../config'); // Configure seu arquivo de configuração

class TaskModel {
  async createTask(userId, title, description, dueDate) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Hangloose12',
      database: 'taskminder',
    });
    try {
      // Insere a tarefa no banco de dados
      const [result] = await connection.execute(
        'INSERT INTO tasks (userId, title, description, dueDate) VALUES (?, ?, ?, ?)',
        [userId, title, description, dueDate]
      );

      return result.insertId;
    } catch (error) {
      throw error;
    } finally {
      connection.end();
    }
  }

  async getTasksByUserId(userId) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Hangloose12',
      database: 'taskminder',
    });
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM tasks WHERE userId = ?',
        [userId]
      );

      return rows;
    } catch (error) {
      throw error;
    } finally {
      connection.end();
    }
  }

  async getTaskById(taskId) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Hangloose12',
      database: 'taskminder',
    });
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM tasks WHERE id = ?',
        [taskId]
      );

      return rows[0];
    } catch (error) {
      throw error;
    } finally {
      connection.end();
    }
  }

  async updateTask(taskId, title, description, dueDate, completed) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Hangloose12',
      database: 'taskminder',
    });
    try {
      const [result] = await connection.execute(
        'UPDATE tasks SET title = ?, description = ?, dueDate = ?, completed = ? WHERE id = ?',
        [title, description, dueDate, completed, taskId]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    } finally {
      connection.end();
    }
  }

  async deleteTask(taskId) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Hangloose12',
      database: 'taskminder',
    });
    try {
      const [result] = await connection.execute('DELETE FROM tasks WHERE id = ?', [
        taskId,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    } finally {
      connection.end();
    }
  }
}

module.exports = new TaskModel();
