const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const validateListing = require("../middleware/validateListing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

// INDEX - Show all listings
router.get("/", wrapAsync(async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index", { allListing });
}));

// NEW - Form to create a new listing
router.get("/new", (req, res) => {
  res.render("listings/new");
});

// CREATE - Add new listing
router.post("/", validateListing, wrapAsync(async (req, res) => {
 
console.log("REQ.BODY DEBUG:", req.body);
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

// SHOW - Show specific listing + populated reviews
router.get("/:id", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("reviews");
  if (!listing) {
    throw new ExpressError("Listing not found", 404);
  }
  res.render("listings/show", { listing });
}));

// EDIT - Edit listing form
router.get("/:id/edit", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ExpressError("Listing not found", 404);
  }
  res.render("listings/edit", { listing });
}));

// UPDATE - Update listing
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
  console.log("EDIT REQ.BODY:", req.body);
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

// DELETE - Delete listing
router.delete("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    throw new ExpressError("Listing not found", 404);
  }
  res.redirect("/listings");
}));

module.exports = router;
