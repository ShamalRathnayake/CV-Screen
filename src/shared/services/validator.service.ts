import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/roles.enum';
import { validationSource } from '../types/validationSource.enum';
import {
  createUnauthorized,
  createValidationError,
} from '../utils/error.factory.utils';

export class ValidatorService {
  static validate(schema: Joi.ObjectSchema, source: validationSource): any {
    return (req: Request, res: Response, next: NextFunction) => {
      const data = req[source];
      const { error } = schema.validate(data || {}, {
        allowUnknown: source === validationSource.headers,
        abortEarly: false,
      });

      if (error) {
        throw createValidationError(error.details[0].message);
      }

      next();
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

  static authorizeRoles(roles: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;

      if (!user || !roles.includes(user.role as UserRole)) {
        throw createUnauthorized();
      }

      next();
    };
  }
}
