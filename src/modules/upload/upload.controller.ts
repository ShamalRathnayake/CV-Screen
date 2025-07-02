/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { fileUploadService } from './upload.service';
import {
  sendError,
  sendSuccess,
  SuccessResponse,
} from '../../shared/utils/response.utils';
import { logger } from '../../shared/utils/logger.utils';
import { AppError } from '../../shared/utils/error.utils';
import { ErrorCode } from '../../shared/config/error.config';
import { createUnexpectedError } from '../../shared/utils/error.factory.utils';
import { IUploadResponse } from './upload.types';

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const uploadedFile = await fileUploadService(req.files);
    return sendSuccess(res, uploadedFile, 'Files uploaded successfully', 201);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};
