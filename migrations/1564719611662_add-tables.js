exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    username: {
      type: 'text',
      notNull: true,
    },
    password: {
      type: 'text',
      notNull: true,
    },
  });

  pgm.createTable('addressbook', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
  });
  
  pgm.createTable('contacts', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    first_name: {
      type: 'text',
      notNull: true,
    },
    last_name: {
      type: 'text',
    },
    home_phone: {
      type: 'text',
    },
    mobile_phone: {
      type: 'text',
    },
    work_phone: {
      type: 'text',
    },
    email: {
      type: 'text',
      unique: true
    },
    city: {
      type: 'text',
    },
    state_or_province: {
      type: 'text',
    },
    postal_code: {
      type: 'text',
    },
    country: {
      type: 'text',
    },
    addressbook_id: {
      type: 'integer',
      references: '"addressbook"'
    },
  });

  pgm.createTable('groups', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    group_name: {
      type: 'text',
      notNull: true,
      unique: true,
    },
    addressbook_id: {
      type: 'integer',
      references: '"groups"'
    },
    contacts_id: {
      type: 'integer',
      references: '"contacts"'
    },
  });
};

exports.down = (pgm) => {

};
