function allGroups(req, res){
  const db = req.app.get('db');
  const id = parseInt(req.params.abid);
  
  db.query(`select * from groups where addressbook_id=${id} and contacts_id is null group by group_name, id`)
    .then(groups => res.status(200).json(groups))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function createGroup(req, res){
  const db = req.app.get('db');

  const { group_name, addressbook_id } = req.body;

  db.groups.insert({
    group_name,
    addressbook_id
  })
  .then(group => res.status(201).json(group))
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
}

function allGroupMembers(req, res){
  const db = req.app.get('db');
  const abid = parseInt(req.params.abid);
  const gName = req.params.gName;

  console.log(abid, gName)
  
  db.query(`select  contacts.id, first_name, last_name, home_phone, 
                    mobile_phone, work_phone, email, groups.id as gid
              from  groups, contacts
              where groups.contacts_id=contacts.id and 
                    groups.addressbook_id=${abid} and
                    groups.group_name='${gName}' and
                    contacts_id is not null
              group by contacts.id, groups.id
          `)
    .then(groups => res.status(200).json(groups))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function addGroupMembers(req, res){
  const db = req.app.get('db');

  const { group_name, addressbook_id, contacts_id } = req.body;

  db.groups.insert({
    group_name,
    addressbook_id,
    contacts_id
  })
  .then(group => res.status(201).json(group))
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
}

function deleteGroup(req, res){
  const db = req.app.get('db');
  const addressbook_id = parseInt(req.params.abid);
  const group_name = req.params.gName;

  db.groups
    .destroy({group_name,addressbook_id})
    .then(group => res.status(200).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function allNotMembers(req, res){
  const db = req.app.get('db');
  const abid = parseInt(req.params.abid);
  const gName = req.params.gName;

  console.log(abid, gName)
  
  db.query(`select  contacts.id, first_name, last_name, home_phone, 
                    mobile_phone, work_phone, email, groups.id as gid
              from  groups, contacts
              where groups.contacts_id=contacts.id and 
                    groups.addressbook_id=${abid} and
                    groups.group_name='${gName}' and
                    contacts_id is not null
              group by contacts.id, groups.id
          `)
    .then(groups => res.status(200).json(groups))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  allGroups,
  createGroup,
  allGroupMembers,
  addGroupMembers,
  deleteGroup,
  allNotMembers
};