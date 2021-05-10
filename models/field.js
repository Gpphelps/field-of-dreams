const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Field extends Model {}

Field.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        num_flowers: {
            type: DataTypes.INTEGER
        },
        flower_position: {
           type: DataTypes.ARRAY(DataTypes.INTEGER),
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'field',
    }
)

module.exports = Field;