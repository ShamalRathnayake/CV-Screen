import { existsSync } from 'fs';
import { MakePredictionDTO } from './prediction.dto';
import { multerConfig } from '../../shared/config/multer.config';
import { join } from 'path';
import { createBadRequest } from '../../shared/utils/error.factory.utils';
import { PredictorService } from '../../shared/services/predictor.service';

export const makePrediction = async ({
  cvFileName,
  jdFilename,
  jdText,
}: MakePredictionDTO) => {
  if (!cvFileName) throw createBadRequest('cvFileName is required');

  if (!jdFilename && !jdText)
    throw createBadRequest('jdFilename or jdText is required');

  if (!existsSync(join(__dirname, multerConfig.path, cvFileName)))
    throw createBadRequest('CV not found');

  if (jdFilename && !existsSync(join(__dirname, multerConfig.path, jdFilename)))
    throw createBadRequest('Job description not found');

  const predictionService = PredictorService.getInstance();

  const { extractedJD, cvData } = await predictionService.predict(
    [join(__dirname, multerConfig.path, cvFileName)],
    jdFilename
      ? join(__dirname, multerConfig.path, jdFilename)
      : (jdText as string),
    !!jdFilename
  );

  return { extractedJD, result: cvData.length > 0 ? cvData[0] : null };
};
