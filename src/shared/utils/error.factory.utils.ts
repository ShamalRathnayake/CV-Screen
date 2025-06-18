import { AppError } from './error.utils';
import { ErrorCode } from '../config/error.config';

export const createBadRequest = (details?: any) =>
  new AppError({ code: ErrorCode.BAD_REQUEST, statusCode: 400, details });

export const createUnauthorized = (details?: any) =>
  new AppError({ code: ErrorCode.UNAUTHORIZED, statusCode: 401, details });

export const createForbidden = (details?: any) =>
  new AppError({ code: ErrorCode.FORBIDDEN, statusCode: 403, details });

export const createNotFound = (details?: any) =>
  new AppError({ code: ErrorCode.NOT_FOUND, statusCode: 404, details });

export const createConflict = (details?: any) =>
  new AppError({ code: ErrorCode.CONFLICT, statusCode: 409, details });

export const createValidationError = (details?: any) =>
  new AppError({ code: ErrorCode.VALIDATION_ERROR, statusCode: 422, details });

export const createInternalError = (details?: any) =>
  new AppError({ code: ErrorCode.INTERNAL_ERROR, statusCode: 500, details });
