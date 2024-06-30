//app.js
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

//optional test:
app.get("/test-products", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(
      "Test Fetched products:",
      products
    );
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Define Routes
app.use(
  "/api/product",
  require("./routes/productRoutes")
);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);
