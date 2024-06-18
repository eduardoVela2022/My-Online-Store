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

// Gets a tag, which id matches the given id, and its associated products
router.get("/:id", async (req, res) => {
  try {
    // Gets from the database a tag, which id matches the given id, and its products
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If no tag has the given id, return a message saying that it was not found
    if (!tagData) {
      res.status(404).json({
        message: `No tag was found with an id of ${req.params.id}.`,
      });
      return;
    }

    // If it succeeds, it returns the obtained data
    res.status(200).json(tagData);
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
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
