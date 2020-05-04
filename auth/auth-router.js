require('dotenv').config();
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
      res.status(500).json({ errorMessage: "There was an error with registering!", err })
    })


});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user)

        res.status(200).json({ message: `You've been logged in, ${user.username}!`, token })
      } else {
        res.status(401).json({ errorMessage: "Your credentials were invalid." })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error with logging you in!", err })
    })
});

const genToken = user => {
  const payload = {
    id: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: "8h",
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
}

module.exports = router;
