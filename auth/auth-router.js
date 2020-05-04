const router = require('express').Router();
const db = require('../api/dbModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  db.add(user)
    .then((user) => {
      res.status(201).json({ message: `Welcome to Dad Jokes, ${user.username}!` })
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "There was an error registering you!", err })
    })


});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
