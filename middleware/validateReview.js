const Joi = require('joi');

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    body: Joi.string().required().messages({
      'string.empty': 'Review body is required.',
    }),
  }).required(),
});

module.exports = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    const err = new Error(msg);
    err.status = 400;
    throw err;
  } else {
    next();
  }
};
