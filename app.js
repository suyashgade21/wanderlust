const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing.js");
const validateListing = require("./middleware/validateListing");

const app = express();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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
// Middleware Setup
// -----------------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// Routes
// -----------------------------

// Home Route
app.get("/", (req, res) => {
    res.send("🌍 Welcome to Wanderlust!");
});

// Index - Show All Listings
app.get("/listings", async (req, res, next) => {
    try {
        const allListing = await Listing.find({});
        res.render("listings/index", { allListing });
    } catch (err) {
        next(err);
    }
});

// New - Show Form
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// Create - Add New Listing
app.post("/listings", validateListing, async (req, res, next) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
});

// Show - Details Page
app.get("/listings/:id", async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).send("❌ Listing not found");
        }
        res.render("listings/show", { listing });
    } catch (err) {
        next(err);
    }
});

// Edit - Show Form
app.get("/listings/:id/edit", async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).send("❌ Listing not found");
        }
        res.render("listings/edit", { listing });
    } catch (err) {
        next(err);
    }
});

// Update - PUT listing

app.put("/listings/:id", validateListing, async (req, res, next) => {
  try {
    console.log("📝 Incoming update:", req.body.listing); // ✅ Check this!
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
});


// Delete - Listing
app.delete("/listings/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) {
            return res.status(404).send("❌ Listing not found");
        }
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
});

// -----------------------------
// 404 Not Found Middleware
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
// Start Server
// -----------------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
