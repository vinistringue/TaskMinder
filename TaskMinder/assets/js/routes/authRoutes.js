// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const { JWT_SECRET } = require('../config'); // Configure seu segredo JWT

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.getUserByUsername(username);
    if (user) {
      return res.status(400).json({ message: 'Nome de usuário já está em uso' });
    }

    const userId = await UserModel.createUser(username, password);
    const token = jwt.sign({ userId, username }, JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id, username }, JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
