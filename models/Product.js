// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, //refers to the type of data
      primaryKey: true, //sets id as primary key
      autoIncrement: true, //automatically increments the value
      allowNull: false //doesn't allow null 
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), //10 is the total number digits and 2 is the number of decimal places
      allowNull: false,
      validate: { //validates that the value is a decimal
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: { //validates that the value is numeric
        isNumeric: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      // References the `Category` model's `id`.
      references: {
        model: 'category',
        key: 'id'
      }
    }
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

