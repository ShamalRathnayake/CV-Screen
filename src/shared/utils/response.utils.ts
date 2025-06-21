import { Response } from 'express';

export type SuccessResponse<T> = {
  status: 'success';
  code: number;
  message: string;
  data: T;
  meta?: Record<string, any>;
};

export type ErrorResponse = {
  status: 'error';
  code: number;
  message: string;
  errorCode?: string;
  meta?: Record<string, any>;
};

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
  meta?: Record<string, any>
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    status: true,
    statusCode,
    message,
    data,
    ...(meta && { meta }),
  });
};

export const sendError = (
  res: Response,
  message = 'Internal Server Error',
  statusCode = 500,
  details?: string,
  meta?: Record<string, any>
): Response<ErrorResponse> => {
  return res.status(statusCode).json({
    status: false,
    statusCode,
    message,
    ...(details && { details }),
    ...(meta && { meta }),
  });
};
