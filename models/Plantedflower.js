const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plantedflower extends Model {}

Plantedflower.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        flower_position_x: { 
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        flower_position_y: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        flower_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'flower',
              key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'plantedflower',
    }
)

module.exports = Plantedflower;