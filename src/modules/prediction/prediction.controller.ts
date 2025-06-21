/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../shared/utils/response.utils';
import * as predictionService from './prediction.service';
import { AppError } from '../../shared/utils/error.utils';
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
