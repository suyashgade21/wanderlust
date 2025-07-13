// utils/validateListing.js
const Joi = require("joi");
 
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
    }),
    //image: Joi.string().allow(''), // Optional image URL
    image: Joi.object({
  url: Joi.string().uri().required().messages({
    "string.uri": "Image must be a valid URL",
    "string.empty": "Image URL cannot be empty"
  }),
  filename: Joi.string().allow('')
}).required(),

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
  }).required()
});

module.exports = listingSchema;
