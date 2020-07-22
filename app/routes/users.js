var express = require('express');
var router = express.Router();
const User = require('../models/user');

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

module.exports = router;
