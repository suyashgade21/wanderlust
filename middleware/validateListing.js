const listingSchema = require("../utils/validateListing"); // this must be a Joi schema
const ExpressError = require("../utils/ExpressError");      // this should be your custom error class

module.exports = (req, res, next) => {
  const { error } = listingSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(msg, 400); // You must have a class that extends Error
  } else {
    next();
  }
};
