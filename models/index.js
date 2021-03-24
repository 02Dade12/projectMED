const User = require('./User');
const Searches = require('./Searches');

User.hasMany(Searches, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Searches.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Searches };
