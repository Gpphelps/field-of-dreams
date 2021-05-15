const sequelize = require('../config/connection');
const { User, Flower, Plantedflower } = require('../models');

const userData = require('./user-seed.json');
const flowerData = require('./flower-seed.json');
const plantedData = require('./plantedFlower-seed.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (flowerData) {
      await Flower.bulkCreate(flowerData):
    }

    for (plantedData) {
        await Plantedflower.bulkCreate(plantedData):
    }
  
    process.exit(0);
  };
  
  seedDatabase();