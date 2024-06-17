// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Product tag class inherits from the Model class
class ProductTag extends Model {}

// Product tag class (Model)
ProductTag.init(
  {
    // Product tag id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Stores the product the product tag is tagging
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    // Stores the tag the product tag represents
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
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
    modelName: "product_tag",
  }
);

// Exports
module.exports = ProductTag;
