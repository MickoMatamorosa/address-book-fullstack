const express = require('express');
const massive = require('massive');
const cors = require('cors');

const users = require('./controllers/users');
const ab = require('./controllers/addressbook');
const protect = require('./protect');

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

  app.post('/', users.login);

  app.post('/register', users.register);

  app.get('/login/addressbook/:uabid', users.addressbook);

  app.use(protect)

  app.post('/ab/create', ab.createContacts);

  app.get('/contacts/:id', ab.allContacts);

  app.patch('/Contacts/update/:id', ab.editContact);

  app.delete('/Contacts/delete/:id', ab.deleteContact);

  const PORT = 3002;
  
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});