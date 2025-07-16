const Joi = require("joi");

// Schema for listings
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().uri().allow(""),
      filename: Joi.string().allow("")
    }).allow(null)  // Optional
  }).required()
});

// Schema for reviews
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required()
  }).required()
});

// ✅ Export both schemas
module.exports = {
  listingSchema,
  reviewSchema
};
