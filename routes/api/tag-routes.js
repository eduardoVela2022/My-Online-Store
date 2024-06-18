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

// Saves a new tag into the database with the given information
router.post("/", async (req, res) => {
  try {
    // Creates a new tag and saves it into the database
    await Tag.create({
      // Tag name
      tagName: req.body.tagName,
    });

    // If it succeeds, it returns a message to let the user know
    res
      .status(200)
      .json("Tag created and saved into the database successfully.");
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Updates a tag, which id matches the given id
router.put("/:id", async (req, res) => {
  try {
    // Updates the tag, from the database, which id matches the given id
    await Tag.update(
      {
        tagName: req.body.tagName,
      },
      { where: { id: req.params.id } }
    );

    // If it succeeds, it returns a message to let the user know
    res.status(200).json("Tag updated successfully.");
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Deletes a tag, which id matches the given id
router.delete("/:id", async (req, res) => {
  try {
    // Deletes the tag, from the database, which id matches the given id
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If it succeeds, it returns a message to let the user know
    res.status(200).json("Tag deleted from the database successfully.");
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Exports
module.exports = router;
