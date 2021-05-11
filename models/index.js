const User = require('./User');
const Flower = require('./Flower');
const Plantedflower = require('./Plantedflower');
const Plantedflower = require('./Plantedflower');

User.hasMany(Flower, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


Flower.hasMany(Plantedflower, {
    foreignKey: 'flower_id'
});

Flower.belongsTo(User, {
    foreignKey: 'user_id'
});

Plantedflower.belongsTo(Flower, {
    foreignKey: 'flower_id'
})

module.exports = { User, Flower, Plantedflower };