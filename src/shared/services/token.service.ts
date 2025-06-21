import jwt from 'jsonwebtoken';
import { config } from '../config/env.config';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwtSecret);
};
