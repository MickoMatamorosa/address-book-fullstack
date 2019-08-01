const express = require('express');
const massive = require('massive');
const cors = require('cors');

const users = require('./controllers/users');

massive({
  host: 'localhost',
  port: 5432,
  database: 'abdb',
  user: 'postgres',
  password: 'abdb',
}).then(db => {
  const app = express();

  app.set('db', db);
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send("Hello Universe Wan!!!");
  });

  app.post('/register', users.register);

  const PORT = 3002;
  
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});