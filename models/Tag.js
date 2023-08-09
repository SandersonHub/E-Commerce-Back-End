const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER, //refers to the type of data which is ID
      allowNull: false, //doesn't allow null
      primaryKey: true, //identifier for each row in the table
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING, //makes this into a string
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
