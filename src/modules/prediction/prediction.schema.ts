import Joi from 'joi';

export const makePredictionSchema = Joi.object()
  .keys({
    cvFileName: Joi.string().required(),
    jdFilename: Joi.string(),
    jdText: Joi.string(),
  })
  .xor('jdFilename', 'jdText');

export const multiplePredictionSchema = Joi.object()
  .keys({
    cvFileNames: Joi.array().items(Joi.string().required()).required(),
    jdFilename: Joi.string(),
    jdText: Joi.string(),
  })
  .xor('jdFilename', 'jdText');
