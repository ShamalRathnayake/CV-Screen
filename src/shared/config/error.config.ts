export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.BAD_REQUEST]: 'The request could not be understood by the server.',
  [ErrorCode.UNAUTHORIZED]: 'Authentication is required.',
  [ErrorCode.FORBIDDEN]: 'Access is forbidden.',
  [ErrorCode.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorCode.CONFLICT]: 'Conflict with current state of the resource.',
  [ErrorCode.INTERNAL_ERROR]: 'An internal server error occurred.',
  [ErrorCode.VALIDATION_ERROR]: 'One or more validation errors occurred.',
};
