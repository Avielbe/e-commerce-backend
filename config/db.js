//config/db.js
const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("../logger");

const connectDB = async () => {
  try {
    // await mongoose.connect('mongodb+srv://avielmbe:M1234566@shufersal.j7gq2sy.mongodb.net/Shufersal?retryWrites=true&w=majority&appName=Shufersal', {});
    const connectionString =
      process.env.MONGODB_CONNECTION_STRING;
    await mongoose.connect(connectionString, {});
    logger.info("MongoDB connected...");

    const collections =
      await mongoose.connection.db
        .listCollections()
        .toArray();
    const collectionNames = collections.map(
      (collection) => collection.name
    );

    logger.info(
      "Connected collections:" +
        collectionNames.join(", ")
    );
  } catch (err) {
    logger.error(
      "MongoDB connection error:",
      err.message
    );
    process.exit(1);
  }
};

module.exports = connectDB;
