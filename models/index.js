// Imports
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// One category has many products
Category.hasMany(Product, {
  foreignKey: "categoryId",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

// One product has many tags, and one tag has many products.
Product.belongsToMany(Tag, { through: ProductTag });

Tag.belongsToMany(Product, { through: ProductTag });

// Exports
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
