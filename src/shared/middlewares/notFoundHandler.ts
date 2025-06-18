import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/error.utils';
import { ErrorCode } from '../config/error.config';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  next(
    new AppError({
      code: ErrorCode.NOT_FOUND,
      statusCode: 404,
      message: `${req.method} ${req.originalUrl} - Path not found`,
    })
  );
};
