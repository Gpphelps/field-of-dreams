const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Flower extends Model { }

Flower.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
            max: 10,
            min: 1,
        },
        stem_width: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        max_curve: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        max_variation: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        bulb_radius: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bulb_color_R: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bulb_color_G: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bulb_color_B: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        petal_color_R: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        petal_color_G: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        petal_color_B: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stem_color_R: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stem_color_G: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stem_color_B: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        petal_color_variation: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        segments: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        segment_variation: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        petal_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        petal_scale: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        petal_shape: {
            type: DataTypes.STRING,
        },
        petal_scale_variation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'flower',
    }

)

module.exports = Flower;