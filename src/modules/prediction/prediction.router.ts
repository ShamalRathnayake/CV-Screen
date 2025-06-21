import { Router } from 'express';
import {
  makeMultiplePredictions,
  makePrediction,
} from './prediction.controller';
import { ValidatorService } from '../../shared/services/validator.service';
import {
  makePredictionSchema,
  multiplePredictionSchema,
} from './prediction.schema';
import { validationSource } from '../../shared/types/validationSource.enum';
import { permissions } from './prediction.permissions';

const router = Router();

router.post(
  permissions.singlePrediction.path,
  ValidatorService.validate(validationSource.body, makePredictionSchema),
  makePrediction
);

router.post(
  permissions.multiplePrediction.path,
  ValidatorService.validate(
    validationSource.headers,
    undefined,
    permissions.multiplePrediction.grantedUserRoles
  ),
  ValidatorService.validate(validationSource.body, multiplePredictionSchema),
  makeMultiplePredictions
);

export default router;
