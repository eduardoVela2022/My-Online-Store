const { Category } = require("../models");

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

async function seedCategories() {
  await Category.bulkCreate(categoryData);
}

module.exports = seedCategories;
