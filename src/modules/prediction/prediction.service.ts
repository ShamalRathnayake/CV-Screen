import { existsSync } from 'fs';
import {
  GetPredictionRequest,
  ICosineSimilarity,
  IPredictionRequest,
  IPredictionRequestMultiple,
  IPredictionResponse,
} from './prediction.types';
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
import { ICv } from '../cvData/cvData.types';
import { IJd } from '../jdData/jdData.types';
import { IUser } from '../user/user.types';
import cvDataModel from '../cvData/cvData.model';
import jdDataModel from '../jdData/jdData.model';

export default class Prediction {
  static async makePrediction({
    cvFileName,
    jdFileName,
    jdText,
  }: IPredictionRequest): Promise<IPredictionResponse> {
    if (!cvFileName) throw createBadRequest('cvFileName is required');

    if (!jdFileName && !jdText)
      throw createBadRequest('jdFileName or jdText is required');

    if (!existsSync(join(__dirname, multerConfig.path, cvFileName)))
      throw createBadRequest('CV not found');

    if (
      jdFileName &&
      !existsSync(join(__dirname, multerConfig.path, jdFileName))
    )
      throw createBadRequest('Job description not found');

    const predictionService = PredictorService.getInstance();

    const { extractedJD, cvData } = await predictionService.predict(
      [join(__dirname, multerConfig.path, cvFileName)],
      jdFileName
        ? join(__dirname, multerConfig.path, jdFileName)
        : (jdText as string),
      !!jdFileName
    );

    if (!cvData || cvData.length === 0)
      throw createInternalError('Prediction process failed');

    const { cosineSimilarity, extractedCv, image } = cvData[0];

    if (!cosineSimilarity || !extractedCv || !extractedJD)
      throw createInternalError('Prediction process failed');

    const savedJd = await JdData.saveJdData(extractedJD);
    const savedCv = await CvData.saveCvData({ ...extractedCv, image });

    let predictionRecord = new predictionModel({
      cvId: savedCv._id,
      jdId: savedJd._id,
      cosineSimilarity,
    });

    predictionRecord = await predictionRecord.save();

    return {
      extractedJD,
      result: [
        {
          cosineSimilarity,
          extractedCv,
          cvId: savedCv._id.toString(),
          jdId: savedJd._id.toString(),
          predictionId: predictionRecord._id.toString(),
          image,
        },
      ],
    };
  }

  static async makeMultiplePredictions(
    { cvFileNames, jdFileName, jdText }: IPredictionRequestMultiple,
    userFromToken?: Partial<IUser>
  ): Promise<IPredictionResponse> {
    if (!cvFileNames || cvFileNames.length === 0)
      throw createBadRequest('cvFileNames is required');

    if (!jdFileName && !jdText)
      throw createBadRequest('jdFileName or jdText is required');

    for (const cvFileName of cvFileNames) {
      if (!existsSync(join(__dirname, multerConfig.path, cvFileName)))
        throw createBadRequest('CV not found');
    }

    if (
      jdFileName &&
      !existsSync(join(__dirname, multerConfig.path, jdFileName))
    )
      throw createBadRequest('Job description not found');

    const predictionService = PredictorService.getInstance();

    const {
      extractedJD,
      cvData,
    }: {
      cvData: {
        extractedCv: ICv;
        cosineSimilarity: ICosineSimilarity[];
        image: string;
      }[];
      extractedJD: IJd;
    } = await predictionService.predict(
      [...cvFileNames.map((cv: any) => join(__dirname, multerConfig.path, cv))],
      jdFileName
        ? join(__dirname, multerConfig.path, jdFileName)
        : (jdText as string),
      !!jdFileName
    );

    if (!cvData || cvData.length === 0)
      throw createInternalError('Prediction process failed');

    const savedJd = await JdData.saveJdData(extractedJD);

    const result = [];

    for (const cvDataItem of cvData) {
      const { cosineSimilarity, extractedCv, image } = cvDataItem;

      if (!cosineSimilarity || !extractedCv || !extractedJD)
        throw createInternalError('Prediction process failed');

      const savedCv = await CvData.saveCvData({ ...extractedCv, image });

      let predictionRecord = new predictionModel({
        cvId: savedCv._id,
        jdId: savedJd._id,
        userId: userFromToken?.id,
        cosineSimilarity,
      });

      predictionRecord = await predictionRecord.save();

      result.push({
        cosineSimilarity,
        extractedCv,
        cvId: savedCv._id.toString(),
        jdId: savedJd._id.toString(),
        predictionId: predictionRecord._id.toString(),
        image,
      });
    }

    return { extractedJD, result };
  }

  static async getAnalytics(): Promise<{
    totalCvs: number;
    totalJds: number;
    averageMatchTotal: number;
    averageHireProbability: number;
    vacanciesByType: any[];
  }> {
    const totalCvs = await cvDataModel.countDocuments();

    const totalJds = await jdDataModel.countDocuments();

    const averageMatchTotalResponse = await predictionModel.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$cosineSimilarity.raw' },
        },
      },
    ]);

    const averageMatchTotal =
      averageMatchTotalResponse?.length > 0
        ? averageMatchTotalResponse[0]?.averageScore
        : 0;

    const averageHireProbabilityResponse = await predictionModel.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$cosineSimilarity.hireProbability' },
        },
      },
    ]);

    const averageHireProbability =
      averageHireProbabilityResponse?.length > 0
        ? averageHireProbabilityResponse[0]?.averageScore
        : 0;

    const vacanciesByType = await jdDataModel.aggregate([
      {
        $group: {
          _id: '$jobTitle',
          total: {
            $sum: 1,
          },
        },
      },
    ]);

    return {
      totalCvs,
      totalJds,
      averageMatchTotal,
      averageHireProbability,
      vacanciesByType,
    };
  }

  static async getPredictions(
    { page = 1, limit = 10 }: GetPredictionRequest,
    userFromToken?: Partial<IUser>
  ): Promise<any> {
    const skip = (page - 1) * limit;

    const [predictions, total] = await Promise.all([
      predictionModel
        .find({ userId: userFromToken?.id })
        .populate('cvId')
        .populate('jdId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      predictionModel.countDocuments({ userId: userFromToken?.id }),
    ]);

    const results = [];

    for (const record of predictions) {
      const result = [
        {
          cosineSimilarity: record.cosineSimilarity,
          extractedCv: record.cvId,
          cvId: record.cvId._id.toString(),
          jdId: record.jdId._id.toString(),
          predictionId: record._id.toString(),
          image: (record.cvId as any).image,
        },
      ];

      results.push({ extractedJD: record.jdId, result });
    }

    return {
      predictions: results,
      total,
      page,
      limit,
    };
  }
}
