// Imports
const seedCategories = require("./category-seeds");
const seedProducts = require("./product-seeds");
const seedTags = require("./tag-seeds");
const seedProductTags = require("./product-tag-seeds");

const sequelize = require("../config/connection");

// Adds all the model seeds to the database
const seedAll = async () => {
  // Database connection is established
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  // Category model seeds
  await seedCategories();
  console.log("\n----- CATEGORIES SEEDED -----\n");

  // Product model seeds
  await seedProducts();
  console.log("\n----- PRODUCTS SEEDED -----\n");

  // Tag model seeds
  await seedTags();
  console.log("\n----- TAGS SEEDED -----\n");

  // Product tag seeds
  await seedProductTags();
  console.log("\n----- PRODUCT TAGS SEEDED -----\n");

  // Process is finished
  process.exit(0);
};

// "seedAll" function is executed
seedAll();
