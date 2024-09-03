// //app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");


// Initialize the Express app
const app = express();

// Connect Database
connectDB();

// Apply Middlewares
app.use(cors());
app.use(express.json());


// Define Routes
app.use(
    "/api/products",
    require("./routes/productRoutes")
);
app.use(
    "/api/users",
    require("./routes/userRoutes")
);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
);

// Optional test route
// app.get("/test-products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     console.log(
//       "Test Fetched products:",
//       products
//     );
//     res.json(products);
//   } catch (err) {
//     console.error(
//       "Error fetching test products:",
//       err.message
//     ); // Add detailed logging here
//     res.status(500).send("Server Error");
//   }
// });