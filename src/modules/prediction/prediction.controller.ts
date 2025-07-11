/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../shared/utils/response.utils';
import { AppError } from '../../shared/utils/error.utils';
import {
  IPredictionRequest,
  IPredictionRequestMultiple,
} from './prediction.types';
import { createUnexpectedError } from '../../shared/utils/error.factory.utils';
import Prediction from './prediction.service';

export const makePrediction = async (
  req: Request<object, object, IPredictionRequest>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const prediction = await Prediction.makePrediction(req.body);

    return sendSuccess(res, prediction, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};

export const makeMultiplePredictions = async (
  req: Request<object, object, IPredictionRequestMultiple>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const prediction = await Prediction.makeMultiplePredictions(
      req.body,
      req.user
    );

    return sendSuccess(res, prediction, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};
