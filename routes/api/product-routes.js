// Imports
const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// Gets all the products and their associated categories and tags
router.get("/", async (req, res) => {
  try {
    // Gets from the database all the products and their categories and tags
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });

    // If it succeeds, it returns the obtained data
    res.status(200).json(productData);
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Gets a product, which id matches the given id, and its associated categories and tags
router.get("/:id", async (req, res) => {
  try {
    // Gets from the database a product, which id matches the given id, and its categories and tags
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    // If no product has the given id, return a message saying that it was not found
    if (!productData) {
      res.status(404).json({
        message: `No product was found with an id of ${req.params.id}.`,
      });
      return;
    }

    // If it succeeds, it returns the obtained data
    res.status(200).json(productData);
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tagId) => {
          return {
            productId: product.id,
            tagId,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { productId: req.params.id },
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tagId }) => tagId);
          const newProductTags = req.body.tagIds
            .filter((tagId) => !productTagIds.includes(tagId))
            .map((tagId) => {
              return {
                productId: req.params.id,
                tagId,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tagId }) => !req.body.tagIds.includes(tagId))
            .map(({ id }) => id);
          console.log(productTagsToRemove);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// Deletes a product, which id matches the given id
router.delete("/:id", async (req, res) => {
  try {
    // Deletes the product, from the database, which id matches the given id
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If it succeeds, it returns a message to let the user know
    res.status(200).json("Product deleted from the database successfully.");
  } catch (error) {
    // If it doesn't, it returns an error
    res.status(500).json(error);
  }
});

// Exports
module.exports = router;
