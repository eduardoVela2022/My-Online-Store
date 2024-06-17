// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

// Tag class inherits from the Model class
class Tag extends Model {}

// Tag class (Model)
Tag.init(
  {
    // Tag id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Tag name
    tagName: {
      type: DataTypes.STRING,
    },
  },
  {
    // Model settings
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

// Exports
module.exports = Tag;
