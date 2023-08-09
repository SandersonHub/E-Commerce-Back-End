// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', //foreign key, establishes relationship between the product and the category
});
// Categories have many Products
Category.hasMany(Product, {
foreignKey: 'category_id',
onDelete: 'CASCADE', //if a category is deleted, any products are deleted as well
});


// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { //the relationship between the product and the tag
  through: ProductTag, //goes through the product tag table, and brings the relationship together
  as: 'product_tags', //alias, reference to the product tag
  foreignKey: 'product_id', //primary key of the product model
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'product_tags',
  foreignKey: 'tag_id',
});



//exporting the four variables
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};