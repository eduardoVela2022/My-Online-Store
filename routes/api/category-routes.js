// Imports
const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Gets all the categories and their associated products
router.get("/", async (req, res) => {
  try {
    // Gets from the database all the categories and their products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    // If it succeeds, it returns the obtained data
    res.status(200).json(categoryData);
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Gets a category, which id matches the given id, and its associated products
router.get("/:id", async (req, res) => {
  try {
    // Gets from the database a category, which id matches the given id, and its products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If no category has the given id, return a message saying that it was not found
    if (!categoryData) {
      res.status(404).json({
        message: `No category was found with an id of ${req.params.id}.`,
      });
      return;
    }

    // If it succeeds, it returns the obtained data
    res.status(200).json(categoryData);
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Saves a new category into the database with the given information
router.post("/", async (req, res) => {
  try {
    // Creates a new category and saves it into the database
    await Category.create({
      // Category name
      categoryName: req.body.categoryName,
    });

    // If it succeeds, it returns a message to let the user know
    res
      .status(200)
      .json("Category created and saved into the database successfully.");
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Updates a category, which id matches the given id
router.put("/:id", async (req, res) => {
  try {
    // Updates the category, from the database, which id matches the given id
    await Category.update(
      {
        categoryName: req.body.categoryName,
      },
      { where: { id: req.params.id } }
    );

    // If it succeeds, it returns a message to let the user know
    res.status(200).json("Category updated successfully.");
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Deletes a category, which id matches the given id
router.delete("/:id", async (req, res) => {
  try {
    // Deletes the category, from the database, which id matches the given id
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If it succeeds, it returns a message to let the user know
    res.status(200).json("Category deleted from the database successfully.");
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Exports
module.exports = router;
