exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('groups', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    group_name: {
      type: 'text',
      notNull: true,
    },
    member_id: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
  });
};

exports.down = (pgm) => {

};
