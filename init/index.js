const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to DB
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
}

// Seed DB with initial listings
async function initDB() {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("🌱 Database seeded with sample listings");
  } catch (err) {
    console.error("❌ Failed to seed database:", err);
  } finally {
    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  }
}

// Run
connectDB().then(initDB);
