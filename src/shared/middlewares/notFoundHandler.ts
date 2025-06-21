import { NextFunction, Request, Response } from 'express';
import { createNotFound } from '../utils/error.factory.utils';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  next(createNotFound(`${req.method} ${req.originalUrl} - Path not found`));
};
