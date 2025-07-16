const Listing = require('../models/listing');

// Show all listings
module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render('listings/index', { listings });
};

// Show the form to create new listing
module.exports.renderNewForm = (req, res) => {
  res.render('listings/new');
};

// Create a new listing
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect(`/listings/${newListing._id}`);
};

// Show one listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/show', { listing });
};

// Show the edit form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('listings/edit', { listing });
};

// Update listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  res.redirect(`/listings/${id}`);
};

// Delete listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect('/listings');
};
