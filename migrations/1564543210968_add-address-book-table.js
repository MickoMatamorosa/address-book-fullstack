exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('address_book', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    contacts_id: {
      type: 'integer',
      notNull: true,
      references: '"contacts"'
    },
    group_id: {
      type: 'integer',
      references: '"groups"'
    },
  });
};

exports.down = (pgm) => {

};
