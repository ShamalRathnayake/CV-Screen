import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/roles.enum';
import { validationSource } from '../types/validationSource.enum';
import {
  createUnauthorized,
  createValidationError,
} from '../utils/error.factory.utils';
import { verifyToken } from './token.service';
import { UserService } from '../../modules/user/user.service';

export class ValidatorService {
  static validate(
    source: validationSource,
    schema?: Joi.ObjectSchema,
    roles: UserRole[] = []
  ): any {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (source === validationSource.headers) {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) throw createUnauthorized();
        const token = authHeader.split(' ')[1];

        const decoded = verifyToken(token);
        const user = await UserService.checkUserExists(decoded.id);

        if (!user || !roles.includes(decoded.role as UserRole))
          throw createUnauthorized();

        req.user = decoded;
        next();
      } else if (schema) {
        const data = req[source];
        const { error } = schema.validate(data || {}, {
          allowUnknown: false,
          abortEarly: false,
        });

        if (error) {
          throw createValidationError(error.details[0].message);
        }

        next();
      }
    };
  }

  static validateFormData(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        throw createValidationError(error.details[0].message);
      }

      next();
    };
  }
}
