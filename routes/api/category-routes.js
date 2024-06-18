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

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

// Exports
module.exports = router;
