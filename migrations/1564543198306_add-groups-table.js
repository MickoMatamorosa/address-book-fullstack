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
    }
  });
};

exports.down = (pgm) => {

};
