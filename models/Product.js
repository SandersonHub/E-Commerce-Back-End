// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}


Product.init( //initializes the product model
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, //refers to data type ID
      primaryKey: true, //sets the ID coluimn as the primary key
      autoIncrement: true, //increments the ID
      allowNull: false, //doesn't allow null
    },
    name: {
      type: DataTypes.STRING, //refers to the type of data
      allowNull: false,
    },
    price: { //indicates the price field
      type: DataTypes.DECIMAL(10, 2), //10 is the total number digits and 2 is the number of decimal places
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;


