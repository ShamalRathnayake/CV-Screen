import { existsSync } from 'fs';
import { MakePredictionDTO, MultiplePredictionDTO } from './prediction.dto';
import { multerConfig } from '../../shared/config/multer.config';
import { join } from 'path';
import {
  createBadRequest,
  createInternalError,
} from '../../shared/utils/error.factory.utils';
import { PredictorService } from '../../shared/services/predictor.service';
import JdData from '../jdData/jdData.service';
import CvData from '../cvData/cvData.service';
import predictionModel from './prediction.model';
import { IUser } from '../user/user.model';

export default class Prediction {
  static async makePrediction({
    cvFileName,
    jdFilename,
    jdText,
  }: MakePredictionDTO) {
    if (!cvFileName) throw createBadRequest('cvFileName is required');

    if (!jdFilename && !jdText)
      throw createBadRequest('jdFilename or jdText is required');

    if (!existsSync(join(__dirname, multerConfig.path, cvFileName)))
      throw createBadRequest('CV not found');

    if (
      jdFilename &&
      !existsSync(join(__dirname, multerConfig.path, jdFilename))
    )
      throw createBadRequest('Job description not found');

    const predictionService = PredictorService.getInstance();

    const { extractedJD, cvData } = await predictionService.predict(
      [join(__dirname, multerConfig.path, cvFileName)],
      jdFilename
        ? join(__dirname, multerConfig.path, jdFilename)
        : (jdText as string),
      !!jdFilename
    );

    if (!cvData || cvData.length === 0)
      throw createInternalError('Prediction process failed');

    const { cosineSimilarity, extractedCv } = cvData[0];

    if (!cosineSimilarity || !extractedCv || !extractedJD)
      throw createInternalError('Prediction process failed');

    const savedJd = await JdData.saveJdData(extractedJD);
    const savedCv = await CvData.saveCvData(extractedCv);

    let predictionRecord = new predictionModel({
      cv_id: savedCv._id,
      jd_id: savedJd._id,
      cosineSimilarity,
    });

    predictionRecord = await predictionRecord.save();

    return {
      extractedJD,
      result: [
        {
          cosineSimilarity,
          extractedCv,
          cv_id: savedCv._id,
          jd_id: savedJd._id,
          prediction_id: predictionRecord._id,
        },
      ],
    };
  }

  static async makeMultiplePredictions(
    { cvFileNames, jdFilename, jdText }: MultiplePredictionDTO,
    userFromToken?: Partial<IUser>
  ) {
    if (!cvFileNames || cvFileNames.length === 0)
      throw createBadRequest('cvFileNames is required');

    if (!jdFilename && !jdText)
      throw createBadRequest('jdFilename or jdText is required');

    for (const cvFileName of cvFileNames) {
      if (!existsSync(join(__dirname, multerConfig.path, cvFileName)))
        throw createBadRequest('CV not found');
    }

    if (
      jdFilename &&
      !existsSync(join(__dirname, multerConfig.path, jdFilename))
    )
      throw createBadRequest('Job description not found');

    const predictionService = PredictorService.getInstance();

    const { extractedJD, cvData } = await predictionService.predict(
      [...cvFileNames.map((cv: any) => join(__dirname, multerConfig.path, cv))],
      jdFilename
        ? join(__dirname, multerConfig.path, jdFilename)
        : (jdText as string),
      !!jdFilename
    );

    if (!cvData || cvData.length === 0)
      throw createInternalError('Prediction process failed');

    const result = [];

    for (const cvDataItem of cvData) {
      const { cosineSimilarity, extractedCv } = cvDataItem;

      if (!cosineSimilarity || !extractedCv || !extractedJD)
        throw createInternalError('Prediction process failed');

      const savedJd = await JdData.saveJdData(extractedJD);
      const savedCv = await CvData.saveCvData(extractedCv);

      let predictionRecord = new predictionModel({
        cv_id: savedCv._id,
        jd_id: savedJd._id,
        user_id: userFromToken?.id,
        cosineSimilarity,
      });

      predictionRecord = await predictionRecord.save();

      result.push({
        cosineSimilarity,
        extractedCv,
        cv_id: savedCv._id,
        jd_id: savedJd._id,
        prediction_id: predictionRecord._id,
      });
    }

    return { extractedJD, result };
  }
}
