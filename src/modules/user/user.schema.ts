import Joi from 'joi';

export const createUserSchema = Joi.object().keys({
  email: Joi.string().trim().required(),
  password: Joi.string().min(8).max(50).required(),
  designation: Joi.string().required(),
  phoneNo: Joi.string().min(10).max(12).required(),
  location: Joi.string().required(),
});

export const updateUserSchema = Joi.object().keys({
  email: Joi.string().trim(),
  designation: Joi.string(),
  phoneNo: Joi.string().min(10).max(12),
  location: Joi.string(),
});

export const getUserByIdSchema = Joi.object().keys({
  id: Joi.string().alphanum().required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().required(),
  password: Joi.string().min(8).max(50).required(),
});

export const checkEmailSchema = Joi.object().keys({
  email: Joi.string().trim().required(),
});
