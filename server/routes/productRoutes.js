const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products - Returns all products from the database
// GET ALL PRODUCTS (WITH SEARCH & FILTERING)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // 1. Filter by Category (if it's not 'All')
    if (category && category !== 'All') {
      query.category = category;
    }

    // 2. Filter by Search Term (Case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Fetch products based on the dynamic query
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;