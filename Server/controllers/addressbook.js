function allContacts(req, res){
  const db = req.app.get('db');
  const id = parseInt(req.params.id);
  const sort = req.params.sort;
  const filter = req.params.filter !== undefined ? req.params.filter : ''
  const filterQuery = filter && `AND (first_name ~* '^${filter}' OR last_name ~* '^${filter}')`
  
  db.query(`select * from contacts where addressbook_id=${id} ${filterQuery} group by id order by last_name ${sort}`)
    .then(ab => res.status(200).json(ab))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function createContacts(req, res){
  const db = req.app.get('db');

  const { first_name,
    last_name,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country,
    addressbook_id } = req.body;

  db.contacts.insert({
    first_name,
    last_name,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country,
    addressbook_id
  })
  .then(post => res.status(201).json(post))
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
}

function editContact(req, res){
  const db = req.app.get('db');
  const { first_name,
    last_name,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country } = req.body;
  const id = parseInt(req.params.id)

  db.contacts
    .update({id}, { 
      first_name,
      last_name,
      home_phone,
      mobile_phone,
      work_phone,
      email,
      city,
      state_or_province,
      postal_code,
      country 
    })
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function deleteContact(req, res){
  const db = req.app.get('db');
  const id = parseInt(req.params.id)

  db.contacts
    .destroy({id})
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  allContacts,
  createContacts,
  editContact,
  deleteContact
};