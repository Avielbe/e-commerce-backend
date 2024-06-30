const mongoose = require('mongoose');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://avielmbe:M1234566@shufersal.j7gq2sy.mongodb.net/Shufersal?retryWrites=true&w=majority&appName=Shufersal', {});
    console.log('MongoDB connected...');

    const products = await Product.find({});
    console.log('Test fetched products:', products);

    mongoose.disconnect();
  } catch (err) {
    console.error(err.message);
  }
};

connectDB();

