/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../shared/utils/response.utils';
import { AppError } from '../../shared/utils/error.utils';
import {
  GetPredictionRequest,
  IPredictionRequest,
  IPredictionRequestMultiple,
} from './prediction.types';
import { createUnexpectedError } from '../../shared/utils/error.factory.utils';
import Prediction from './prediction.service';
import {
  logger,
  logRequestEnd,
  logRequestInit,
} from '../../shared/utils/logger.utils';

export const makePrediction = async (
  req: Request<object, object, IPredictionRequest>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await logRequestInit(req, 'makePrediction', 'Prediction process started');

    const prediction = await Prediction.makePrediction(req.body);

    await logRequestEnd(req, 'makePrediction', 'Prediction made successfully');

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
    await logRequestInit(
      req,
      'makeMultiplePredictions',
      'Prediction process started'
    );

    const prediction = await Prediction.makeMultiplePredictions(
      req.body,
      req.user
    );

    await logRequestEnd(
      req,
      'makeMultiplePredictions',
      'Prediction made successfully'
    );

    return sendSuccess(res, prediction, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};

export const getAnalytics = async (
  req: Request<object, object, object>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await logRequestInit(req, 'getAnalytics', 'Analytics process started');

    const analytics = await Prediction.getAnalytics();

    await logRequestEnd(req, 'getAnalytics', 'Analytics gathered successfully');

    return sendSuccess(res, analytics, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};

export const getPredictions = async (
  req: Request<object, object, GetPredictionRequest>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await logRequestInit(
      req,
      'getPredictions',
      'Prediction retrieval process started'
    );

    const predictions = await Prediction.getPredictions(req.query);

    await logRequestEnd(
      req,
      'getPredictions',
      'Prediction retrieval process successful'
    );

    return sendSuccess(res, predictions, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};
