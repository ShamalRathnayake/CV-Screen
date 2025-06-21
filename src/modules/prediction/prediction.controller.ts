/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { sendError, sendSuccess } from '../../shared/utils/response.utils';
import { logger } from '../../shared/utils/logger.utils';
import * as predictionService from './prediction.service';
import { AppError } from '../../shared/utils/error.utils';
import { ErrorCode } from '../../shared/config/error.config';
import { MakePredictionDTO } from './prediction.dto';
import { createUnexpectedError } from '../../shared/utils/error.factory.utils';

export const makePrediction = async (
  req: Request<object, object, MakePredictionDTO>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const prediction = await predictionService.makePrediction(req.body);

    return sendSuccess(res, prediction, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    else throw createUnexpectedError(err?.message);
  }
};
