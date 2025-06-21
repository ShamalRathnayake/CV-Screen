import { Router } from 'express';
import { makePrediction } from './prediction.controller';
import { ValidatorService } from '../../shared/services/validator.service';
import { makePredictionSchema } from './prediction.schema';
import { validationSource } from '../../shared/types/validationSource.enum';

const router = Router();

router.post(
  '/',
  ValidatorService.validate(makePredictionSchema, validationSource.body),
  makePrediction
);

export default router;
