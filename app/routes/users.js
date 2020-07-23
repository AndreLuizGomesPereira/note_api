var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;

/* POST users */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar novo usuário.' });
  }
});

/* POST Login de Acesso. */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
      res.status(401).json({ error: 'Incorreto e-mail ou senha.' });
    else {
      user.isCorrectPassword(password, function (err, same) {
        if (!same)
          res.status(401).json({ error: 'Incorreto e-mail ou senha.' });
        else {
          const token = jwt.sign({ email }, secret, { expiresIn: '10d' });
          res.json({ user: user, token: token });
        }
      })
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno, tente novamente, ou contacte o Administrador do sistema.' })
  }
})

module.exports = router;
