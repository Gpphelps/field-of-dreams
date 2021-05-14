const { Plantedflower } = require('../models');

const plantedFlowerData = [
    {
        flower_position: '[100, 200]',
        flower_id: 1,
    },
    {
        flower_position: '[20, 100]',
        flower_id: 2,
    },
    {
        flower_position: '[50, 40]',
        flower_id: 3,
    },
    {
        flower_position: '[30, 150]',
        flower_id: 4,
    },
    {
        flower_position: '[150, 75]',
        flower_id: 5,
    },
    {
        flower_position: '[10, 300]',
        flower_id: 6,
    },
    {
        flower_position: '[100, 120]',
        flower_id: 7,
    },
];

const seedPlantedFlowers = () => Plantedflower.bulkCreate(plantedFlowerData);

module.exports = seedPlantedFlowers;