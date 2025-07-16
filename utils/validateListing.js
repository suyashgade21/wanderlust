const Joi = require("joi");

// Listing schema
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
    }),
    image: Joi.string().uri().allow('').messages({
      "string.uri": "Image must be a valid URL",
      "string.empty": "Image URL cannot be empty"
    }),
    price: Joi.number().required().min(0).messages({
      "number.base": "Price must be a number",
      "number.min": "Price must be at least 0",
    }),
    location: Joi.string().required().messages({
      "string.empty": "Location is required",
    }),
    country: Joi.string().required().messages({
      "string.empty": "Country is required",
    }),
  }).required(),
});

// Review schema
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Rating must be a number",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating cannot exceed 5",
    }),
    body: Joi.string().required().messages({
      "string.empty": "Comment is required",
    }),
  }).required(),
});

module.exports = {
  listingSchema,
  reviewSchema,
};
