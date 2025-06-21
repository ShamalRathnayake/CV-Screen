import { Router } from 'express';

import { ValidatorService } from '../../shared/services/validator.service';

import { validationSource } from '../../shared/types/validationSource.enum';
import { permissions } from './user.permissions';
import { createUserSchema, updateUserSchema } from './user.schema';
import { createUser, updateUser } from './user.controller';

const router = Router();

router.post(
  permissions.createUser.path,
  ValidatorService.validate(validationSource.body, createUserSchema),
  createUser
);

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

export default router;
