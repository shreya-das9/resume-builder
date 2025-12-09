const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB", err.message);
    console.log("WARNING: MongoDB connection failed. Running in offline mode.");
    // Don't exit, allow app to continue for testing
  }
};

module.exports = connectDB;
