const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secretToken.js');

function register(req, res) {
  const db = req.app.get('db');

  const { username, password } = req.body;

  argon2
  .hash(password)
  .then(hash => {
    // add users
    return db.users.insert({
        username,
        password: hash,
      },
      { fields: ['id', 'username'] }
    );
  })
  .then(user => {
    // address book FKs
    db.addressbook.insert({
      user_id: user.id,
    })

    const token = jwt.sign({ userId: user.id }, secret); // adding token generation
    res.status(201).json({ ...user, token });

  })
  .catch(err => {
      console.error(err);
      res.status(500).end();
  });
}

function login(req, res) {
  const db = req.app.get('db');
  const { username, password } = req.body;

  db.users
  .findOne(
    { username },
    { fields: ['id', 'username', 'password'] }
  )
  .then(user => {
    // console.log("")
    if (!user) throw new Error('Invalid Username or Password');

    return argon2.verify(user.password, password).then(valid => {
      console.log(valid ? "true" : "false");

      if (!valid) {
        throw new Error('Incorrect Username or Password');
      }

      const token = jwt.sign({ userId: user.id }, secret);
      delete user.password; // remove password hash from returned user object
      res.status(200).json({ ...user, token });
    });
  })
  .catch(err => {
    if (['Invalid username', 'Incorrect password'].includes(err.message)) {
      res.status(400).json({ error: err.message });
    } else {
      console.error(err);
      res.status(500).end();
    }
  });
}

function addressbook(req, res){
  const db = req.app.get('db');
  const user_id = parseInt(req.params.uabid)
  
  db.addressbook
    .find({user_id})
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  register,
  login,
  addressbook,
};