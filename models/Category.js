// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

// Category class inherits from the Model class
class Category extends Model {}

// Category class (Model)
Category.init(
  {
    // Category id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Category name
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Model settings
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

// Exports
module.exports = Category;
