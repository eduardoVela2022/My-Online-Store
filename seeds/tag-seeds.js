// Imports
const { Tag } = require("../models");

// Tag model seeds
const tagData = [
  {
    tagName: "rock music",
  },
  {
    tagName: "pop music",
  },
  {
    tagName: "blue",
  },
  {
    tagName: "red",
  },
  {
    tagName: "green",
  },
  {
    tagName: "white",
  },
  {
    tagName: "gold",
  },
  {
    tagName: "pop culture",
  },
];

// Adds the tag model seeds to the database
async function seedTags() {
  await Tag.bulkCreate(tagData);
}

// Exports
module.exports = seedTags;
