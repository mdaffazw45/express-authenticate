const Joi = require('joi');

// Validation schema for user attributes
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().allow(null).optional(),
  lastName: Joi.string().allow(null).optional(),
  phoneNumber: Joi.string().allow(null).optional(),
  // Add more validations for other user attributes if needed
});

// Validation schema for admin attributes
const adminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().allow(null).optional(),
  lastName: Joi.string().allow(null).optional(),
  phoneNumber: Joi.string().allow(null).optional(),
  // Add more validations for other admin attributes if needed
});

module.exports = {
  userSchema,
  adminSchema,
};
