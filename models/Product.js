// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Product class inherits from the Model class
class Product extends Model {}

// Product class (Model)
Product.init(
  {
    // Product id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Product name
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Product price
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    // Product stock
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    // Stores the category the product is in.
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    // Model settings
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

// Exports
module.exports = Product;
