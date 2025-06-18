import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/error.utils';
import { ErrorCode } from '../config/error.config';
import { logger } from '../utils/logger.utils';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): any => {
  let appError: AppError;

  if (err instanceof AppError) {
    appError = err;
  } else {
    appError = new AppError({
      code: ErrorCode.INTERNAL_ERROR,
      statusCode: 500,
      details: process.env.NODE_ENV === 'development' ? err : undefined,
    });
  }

  logger.error({
    message: appError.message,
    code: appError.code,
    statusCode: appError.statusCode,
    path: req.originalUrl,
    method: req.method,
    ...(appError.details && { details: appError.details }),
  });

  return res.status(appError.statusCode).json(appError.toJSON());
};
