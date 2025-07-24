import { Router } from 'express';

import { ValidatorService } from '../../shared/services/validator.service';

import { validationSource } from '../../shared/types/validationSource.enum';
import { permissions } from './user.permissions';
import {
  checkEmailSchema,
  createUserSchema,
  getUserByIdSchema,
  loginSchema,
  updateUserSchema,
} from './user.schema';
import {
  checkEmail,
  createPayment,
  createUser,
  getUserById,
  login,
  updateUser,
} from './user.controller';

const router = Router();

router.get(
  permissions.checkEmail.path,
  ValidatorService.validate(validationSource.query, checkEmailSchema),
  checkEmail
);

router.post(
  permissions.createUser.path,
  ValidatorService.validate(validationSource.body, createUserSchema),
  createUser
);

router.post(
  permissions.login.path,
  ValidatorService.validate(validationSource.body, loginSchema),
  login
);

router.get(permissions.createPayment.path, createPayment);

router.put(
  permissions.updateUser.path,
  ValidatorService.validate(
    validationSource.headers,
    undefined,
    permissions.updateUser.grantedUserRoles
  ),
  ValidatorService.validate(validationSource.body, updateUserSchema),
  updateUser
);

router.get(
  permissions.getUserById.path,
  ValidatorService.validate(
    validationSource.headers,
    undefined,
    permissions.getUserById.grantedUserRoles
  ),
  ValidatorService.validate(validationSource.params, getUserByIdSchema),
  getUserById
);

export default router;
