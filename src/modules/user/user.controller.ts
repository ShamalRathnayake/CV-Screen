/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../shared/utils/response.utils';
import { AppError } from '../../shared/utils/error.utils';
import { createUnexpectedError } from '../../shared/utils/error.factory.utils';
import { UserService } from './user.service';
import { IUser } from './user.model';

export const createUser = async (
  req: Request<object, object, Partial<IUser>>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = await UserService.createUser(req.body);
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
    const user = await UserService.updateUser(
      req?.user?.id as string,
      req.body
    );
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
    const user = await UserService.getUserById(req?.params?.id);
    return sendSuccess(res, user, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    else throw createUnexpectedError(err?.message);
  }
};

export const createPayment = async (
  req: Request<object, object, object>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const secret = await UserService.createPayment();
    return sendSuccess(res, secret, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    else throw createUnexpectedError(err?.message);
  }
};

export const login = async (
  req: Request<object, object, { email: string; password: string }>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const auth = await UserService.login(req.body);
    return sendSuccess(res, auth, '', 200);
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    else throw createUnexpectedError(err?.message);
  }
};
