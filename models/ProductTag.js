const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    //define columns
    
    id: {
      type: DataTypes.INTEGER, //inicates the type of data which is ID
      allowNull: false, //doesn't allow null
      primaryKey: true, //sets id as the primary key
      autoIncrement: true //increments the ID
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product', //referes to the product model
        key: 'id' //refers to the id of the given product
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    //define model options
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag', //sets the model name
  }
);

module.exports = ProductTag;

