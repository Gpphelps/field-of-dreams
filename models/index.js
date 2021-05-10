const User = require('./User');
const Flower = require('./Flower');

User.hasMany(Flower, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Flower.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Flower };