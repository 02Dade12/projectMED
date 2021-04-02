const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Searches extends Model { }

Searches.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        stock_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock_symbol: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock_country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock_sector: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock_exchange: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock_description: {
            type: DataTypes.STRING(10000),
            allowNull: true,
        },
        stock_open: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        stock_high: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        stock_low: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        stock_price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'searches',
    },
)

module.exports = Searches