function allContacts(req, res){
  const db = req.app.get('db');
  
  db.contacts
    .find()
    .then(post => res.status(200).json(post))
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

  console.log(req.body)

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

module.exports = {
  allContacts,
  createContacts
};