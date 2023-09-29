// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth'); // Middleware de autenticação

// Rota protegida com autenticação
router.get('/', authenticateToken, TaskController.getAllTasks);

// Outras rotas
router.post('/', TaskController.createTask);
router.get('/:id', TaskController.getTaskById);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
