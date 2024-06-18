// Imports
const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Gets all the tags and their associated products
router.get("/", async (req, res) => {
  try {
    // Gets from the database all the tags and their products
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });

    // If it succeeds, it returns the obtained data
    res.status(200).json(tagData);
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

// Exports
module.exports = router;
