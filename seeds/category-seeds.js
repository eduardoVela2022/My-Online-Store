// Imports
const { Category } = require("../models");

// Category model seeds
const categoryData = [
  {
    categoryName: "Shirts",
  },
  {
    categoryName: "Shorts",
  },
  {
    categoryName: "Music",
  },
  {
    categoryName: "Hats",
  },
  {
    categoryName: "Shoes",
  },
];

// Adds the category model seeds to the database
async function seedCategories() {
  await Category.bulkCreate(categoryData);
}

// Exports
module.exports = seedCategories;
