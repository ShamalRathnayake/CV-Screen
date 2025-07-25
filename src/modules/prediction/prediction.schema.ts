import Joi from 'joi';

export const makePredictionSchema = Joi.object()
  .keys({
    cvFileName: Joi.string().required(),
    jdFileName: Joi.string(),
    jdText: Joi.string(),
  })
  .xor('jdFileName', 'jdText');

export const multiplePredictionSchema = Joi.object()
  .keys({
    cvFileNames: Joi.array().items(Joi.string().required()).required(),
    jdFileName: Joi.string(),
    jdText: Joi.string(),
  })
  .xor('jdFileName', 'jdText');

export const getPredictionsSchema = Joi.object().keys({
  limit: Joi.number(),
  page: Joi.number(),
});
