const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");

const app = express();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Route Files
const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/reviews");

// -----------------------------
// Database Connection
// -----------------------------
async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
main();

// -----------------------------
// View Engine & Middleware Setup
// -----------------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// Route Setup
// -----------------------------
app.use("/listings", listingRoutes);       // All listing-related routes
app.use("/listings", reviewRoutes);        // Nested review routes under listings

// -----------------------------
// Home Route
// -----------------------------
app.get("/", (req, res) => {
  res.send("🌍 Welcome to Wanderlust!");
});

// -----------------------------
// 404 Not Found
// -----------------------------
app.use((req, res) => {
  res.status(404).send("🚫 Page Not Found");
});

// -----------------------------
// Global Error Handler
// -----------------------------
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(`⚠️ ${err.message || "Something went wrong."}`);
});

// -----------------------------
// Server Start
// -----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
