import { AppError } from './error.utils';
import { ErrorCode } from '../config/error.config';

export const createBadRequest = (details?: any) =>
  new AppError({ code: ErrorCode.BAD_REQUEST, details });

export const createUnauthorized = (details?: any) =>
  new AppError({ code: ErrorCode.UNAUTHORIZED, details });

export const createForbidden = (details?: any) =>
  new AppError({ code: ErrorCode.FORBIDDEN, details });

export const createNotFound = (details?: any) =>
  new AppError({ code: ErrorCode.NOT_FOUND, details });

export const createConflict = (details?: any) =>
  new AppError({ code: ErrorCode.CONFLICT, details });

export const createValidationError = (details?: any) =>
  new AppError({ code: ErrorCode.VALIDATION_ERROR, details });

export const createUnsupportedMediaType = (details?: any) =>
  new AppError({ code: ErrorCode.UNSUPPORTED_MEDIA_TYPE, details });

export const createUnprocessableEntity = (details?: any) =>
  new AppError({ code: ErrorCode.UNPROCESSABLE_ENTITY, details });

export const createPayloadTooLarge = (details?: any) =>
  new AppError({ code: ErrorCode.PAYLOAD_TOO_LARGE, details });

export const createFileTooLarge = (details?: any) =>
  new AppError({ code: ErrorCode.FILE_TOO_LARGE, details });

export const createUnsupportedFileType = (details?: any) =>
  new AppError({ code: ErrorCode.UNSUPPORTED_FILE_TYPE, details });

export const createMissingParameters = (details?: any) =>
  new AppError({ code: ErrorCode.MISSING_PARAMETERS, details });

export const createInvalidCredentials = (details?: any) =>
  new AppError({ code: ErrorCode.INVALID_CREDENTIALS, details });

export const createInvalidToken = (details?: any) =>
  new AppError({ code: ErrorCode.INVALID_TOKEN, details });

export const createExpiredToken = (details?: any) =>
  new AppError({ code: ErrorCode.EXPIRED_TOKEN, details });

export const createTooManyRequests = (details?: any) =>
  new AppError({ code: ErrorCode.TOO_MANY_REQUESTS, details });

export const createDependencyFailure = (details?: any) =>
  new AppError({ code: ErrorCode.DEPENDENCY_FAILURE, details });

export const createServiceUnavailable = (details?: any) =>
  new AppError({ code: ErrorCode.SERVICE_UNAVAILABLE, details });

export const createTimeout = (details?: any) =>
  new AppError({ code: ErrorCode.TIMEOUT, details });

export const createDatabaseError = (details?: any) =>
  new AppError({ code: ErrorCode.DATABASE_ERROR, details });

export const createInternalError = (details?: any) =>
  new AppError({ code: ErrorCode.INTERNAL_ERROR, details });

export const createUnexpectedError = (details?: any) =>
  new AppError({ code: ErrorCode.UNEXPECTED_ERROR, details });
