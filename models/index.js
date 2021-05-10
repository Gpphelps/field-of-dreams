const User = require('./User');
const Flower = require('./Flower');
const Field = require('./Field')

User.hasMany(Flower, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Field.hasMany(User, {
    foreignKey: 'user_id'
});


Flower.belongsTo(User, {
    foreignKey: 'flower_id'
});

Flower.belongsTo(Field, {
    foreignKey: 'flower_id'
})

module.exports = { User, Flower, Field };