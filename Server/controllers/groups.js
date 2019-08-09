function allGroups(req, res){
  const db = req.app.get('db');
  const id = parseInt(req.params.abid);

  console.log( 'All Groups' , id )
  
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

  console.log( 'Create Group' ,group_name, addressbook_id )

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
  const sort = req.params.sort ? req.params.sort : 'ASC' ;

  console.log( 'All Group Members' , abid, gName, sort )
  
  db.query(`select  contacts.id, first_name, last_name, home_phone, 
                    mobile_phone, work_phone, email, groups.id as gid
              from  groups, contacts
              where groups.contacts_id=contacts.id and 
                    groups.addressbook_id=${abid} and
                    groups.group_name='${gName}' and
                    contacts_id is not null
              group by contacts.id, groups.id
              order by last_name ${sort}
          `)
    .then(groups => res.status(200).json(groups))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function addGroupMembers(req, res){
  const db = req.app.get('db');

  const { group_name, abid, contacts } = req.body;

  const values = contacts.map(val => `('${group_name}','${abid}','${val}')`).join();

  console.log( 'Add Group Members' , values )
  
  db.query(`insert into groups (group_name, addressbook_id, contacts_id) values ${values}`)
  .then(group => res.send("Successful!!"))
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
}

function deleteGroup(req, res){
  const db = req.app.get('db');
  const addressbook_id = parseInt(req.params.abid);
  const group_name = req.params.gName;

  console.log( 'Delete Group' , addressbook_id, group_name )

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

  console.log( 'All Not Group Members' , abid, gName )

  db.query(`SELECT c.id, first_name, last_name FROM contacts AS c
              WHERE NOT EXISTS ( SELECT contacts_id
                  FROM groups AS g
                  WHERE g.contacts_id = c.id and g.group_name='${gName}'
                ) and addressbook_id=${abid};`)
    .then(groups => res.status(200).json(groups))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function removeContact(req, res){
  const db = req.app.get('db');
  const id = req.params.gid;

  console.log( 'Remove Contact' , id )

  db.groups
    .destroy({id})
    .then(group => res.status(200).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function membersCount(req, res){
  const db = req.app.get('db');
  const abid = parseInt(req.params.abid);
  const gName = req.params.gName;

  db.query(`select count(*) as num from groups where addressbook_id=${abid} and group_name='${gName}' and contacts_id is not null`)
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
  allNotMembers,
  removeContact,
  membersCount
};