function allGroups(req, res){
  const db = req.app.get('db');
  const id = parseInt(req.params.id);
  
  db.query(`select * from groups where addressbook_id=${id} group by group_name, id`)
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

module.exports = {
  allGroups,
  createGroup,
};