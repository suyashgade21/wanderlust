const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Review", reviewSchema);
