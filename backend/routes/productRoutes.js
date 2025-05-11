const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// my first route will be to create a product
// @route POST /api/products
// @desc Create a new product in the database
// @access Private (only admin can create a product)

router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, // Reference to the user who created the product
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route PUT /api/products/:id
//@desc Update a product in the database
//@access Private (only admin can update a product)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;
    // fidn the product by id
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;
      // save the product
      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Now i will work upon the deleting the product
// @route DELETE /api/products/:id
// @desc Delete a product from the database by using its id
// @access Private (only admin can delete a product)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      // it will delete the product from the database
      // and also remove the product from the user who created it
      await product.deleteOne();
      res.status(200).json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products
// @desc Get all the products from the database with options to filter, sort, and paginate
// @access Public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;
    let query = {};
    // filtering the products based on the query parameters
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    // sorting the products based on the query parameters
    let sort = {};
    // here i will sort the products based on the query parameters
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }
    // first i will find the products based on the query parameters
    let prducts = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(prducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
// @route GET /api/products/best-seller
// @desc Get best-selling products from the database logic will be highest rating
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
   const bestSeller = await Product.find({}).sort({ rating: -1 }).limit(4);
   if(bestSeller) {
    res.status(200).json(bestSeller);
   }  else {
    res.status(404).json({ message: "No best seller found" });
   }

  }
  catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

  // @route GET /api/products/new-arrivals  
// @desc Get new arrivals from the database logic will be based on the createdAt field
// @access Public 
router.get("/new-arrivals", async (req, res) => {
try {
  // find the products based on the createdAt field
  // and sort them in descending order and limit the result to 8 products
  const newArrivals = await Product.find({}).sort({ createdAt: -1 }).limit(8);
  if (newArrivals) {
    res.status(200).json(newArrivals);
  } else {
    res.status(404).json({ message: "No new arrivals found" });
  }
}
catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
}




// @route GET /api/products/:id
// @desc Get a product by id from the database
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/similar/:id
// @desc Get similar products by category from the database
// @access Public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  // Find the product by ID to get its category
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Find similar products in the same category, excluding the current product
    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.status(200).json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


});

module.exports = router;
