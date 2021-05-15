const sequelize = require('../config/connection');
const { User, Flower, Plantedflower } = require('../models');

const userData = require('./user-seed.json');
const flowerData = require('./flower-seed.json');
const plantedData = require('./plantedFlower-seed.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    
    const flowers =  await Flower.bulkCreate(flowerData);
    console.log(flowers);

    const planted = await Plantedflower.bulkCreate(plantedData);
    console.log(planted);
  
    process.exit(0);
  };
  
  seedDatabase();