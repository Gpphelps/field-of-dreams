const User = require('./User');
const Flower = require('./Flower');
const Plantedflower = require('./Plantedflower');

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