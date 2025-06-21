import {
  ErrorCode,
  ErrorMessages,
  ErrorStatusCodes,
} from '../config/error.config';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: any;

  constructor({
    code,
    message,
    statusCode,
    details,
  }: {
    code: ErrorCode;
    message?: string;
    statusCode?: number;
    details?: any;
  }) {
    super(details || ErrorMessages[code]);
    this.code = code;
    this.statusCode = statusCode || ErrorStatusCodes[code] || 500;
    this.details = message || ErrorMessages[code];

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.details || undefined,
      },
    };
  }
}
