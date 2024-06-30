// //routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log('Fetched products:', products);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;



// const express = require('express');
// const Product = require('../models/Product');
// const router = express.Router();

// // @route   GET /api/products
// // @desc    Get all products
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find({});
//     console.log('Fetched products:==========>', products); 
//     res.json(products);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;
