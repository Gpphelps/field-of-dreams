const User = require('./User.js');
const Flower = require('./Flower.js');
const Plantedflower = require('./Plantedflower.js');

User.hasMany(Flower, {
    foreignKey: 'user_id',
});

Flower.hasMany(Plantedflower, {
    foreignKey: 'flower_id'
});

Flower.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Plantedflower.belongsTo(Flower, {
    foreignKey: 'flower_id',
    onDelete: 'CASCADE'
})

module.exports = { User, Flower, Plantedflower };