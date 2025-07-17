import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const envSchema = Joi.object({
  PORT: Joi.number().default(4000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('production'),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(10).required(),
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'verbose', 'debug', 'silly')
    .default('info'),
  STRIPE_SECRET_KEY: Joi.string().min(10).required(),
  PRO_CHARGE: Joi.number().required().min(10),
  MODEL_CACHE: Joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,
  databaseUrl: envVars.DATABASE_URL,
  jwtSecret: envVars.JWT_SECRET,
  logLevel: envVars.LOG_LEVEL,
  stripeSecret: envVars.STRIPE_SECRET_KEY,
  proCharge: envVars.PRO_CHARGE,
  modelCache: envVars.MODEL_CACHE,
};
