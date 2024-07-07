//models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  pricePerHundredGrams: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "product",
  ProductSchema,
  "product"
);

// module.exports = mongoose.model('Product', ProductSchema, 'Products');
