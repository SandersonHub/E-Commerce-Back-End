const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Category extends Model {} //

Category.init( //initializes the category model
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, //refers to the type of data which is ID
      allowNull: false, //doesn't allow null
      primaryKey: true, //unique identifier for each row in the table
      autoIncrement: true, //auto increments the ID
    },
    category_name: { //sets the category name
      type: DataTypes.STRING, //type of data is a string
      allowNull: false, //doesn't allow null
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;


