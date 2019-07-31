const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secretToken.js');

function register(req, res) {
  const db = req.app.get('db');

  const { username, firstname,
    lastname, email, password } = req.body;

  argon2
  .hash(password)
  .then(hash => {
    return db.users.insert({
            username,
            firstname,
            lastname,
            email,
            password: hash,
        },
        {
            fields: ['id', 'username', 'firstname', 'lastname', 'email']
        }
    );
  })
  .then(user => {
      const token = jwt.sign({ userId: user.id }, secret); // adding token generation
      res.status(201).json({ ...user, token });
  })
  .catch(err => {
      console.error(err);
      res.status(500).end();
  });
}

module.exports = {
  register,
};