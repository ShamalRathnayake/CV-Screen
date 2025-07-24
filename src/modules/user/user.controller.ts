/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../shared/utils/response.utils';
import { AppError } from '../../shared/utils/error.utils';
import { createUnexpectedError } from '../../shared/utils/error.factory.utils';
import { UserService } from './user.service';
import { IUser } from './user.types';
import { logRequestEnd, logRequestInit } from '../../shared/utils/logger.utils';

export const createUser = async (
  req: Request<object, object, Partial<IUser>>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await logRequestInit(req, 'createUser', 'User creation process started');
    const user = await UserService.createUser(req.body);
    await logRequestEnd(req, 'createUser', 'User created successfully');

    return sendSuccess(res, user, '', 201);
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    else throw createUnexpectedError(err?.message);
  }
};

export const updateUser = async (
  req: Request<object, object, Partial<IUser>>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await logRequestInit(req, 'updateUser', 'User update process started');
    const user = await UserService.updateUser(
      req?.user?.id as string,
      req.body
    );
    await logRequestEnd(req, 'updateUser', 'User updated successfully');

    return sendSuccess(res, user, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    else throw createUnexpectedError(err?.message);
  }
};

export const getUserById = async (
  req: Request<Record<string, string>, object, object>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await logRequestInit(req, 'getUserById', 'User retrieval process started');
    const user = await UserService.getUserById(req?.params?.id);
    await logRequestEnd(req, 'getUserById', 'User retrieved successfully');

    return sendSuccess(res, user, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};

export const createPayment = async (
  req: Request<object, object, object>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await logRequestInit(
      req,
      'createPayment',
      'Payment creation process started'
    );
    const secret = await UserService.createPayment();
    await logRequestEnd(req, 'createPayment', 'Payment created successfully');

    return sendSuccess(res, secret, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};

export const login = async (
  req: Request<object, object, { email: string; password: string }>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await logRequestInit(req, 'login', 'Login process started');
    const auth = await UserService.login(req.body);
    await logRequestEnd(req, 'login', 'Logged in successfully');

    return sendSuccess(res, auth, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};

export const checkEmail = async (
  req: Request<object, object, object, { email: string }>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    await logRequestInit(req, 'checkEmail', 'Check email process started');
    const result = await UserService.checkUserExistsByEmail(req.query.email);
    await logRequestEnd(req, 'checkEmail', 'Check email process successfull');

    return sendSuccess(res, result, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) next(err);
    else throw createUnexpectedError(err?.message);
  }
};
