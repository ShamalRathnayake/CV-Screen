import { Types, Document } from 'mongoose';
import { ICv } from '../cvData/cvData.types';
import { IJd } from '../jdData/jdData.types';

export interface IPredictionRequest {
  cvFileName: string;
  jdFileName?: string;
  jdText?: string;
}

export interface IPredictionRequestMultiple {
  cvFileNames: Array<string>;
  jdFileName?: string;
  jdText?: string;
}

export interface ICosineSimilarity {
  total?: number;
  technical?: number;
  education?: number;
  workExp?: number;
  raw?: number;
  hireProbability?: number;
  hireDecision?: number;
}

export interface IPredictionResponse {
  extractedJD: IJd;
  result: {
    cosineSimilarity: ICosineSimilarity[];
    extractedCv: ICv;
    cvId: string;
    jdId: string;
    predictionId: string;
    image?: string;
  }[];
}

export interface IPrediction extends Document {
  _id: Types.ObjectId;
  cvId: Types.ObjectId;
  jdId: Types.ObjectId;
  userId?: Types.ObjectId;
  cosineSimilarity: {
    total?: number;
    technical?: number;
    education?: number;
    workExp?: number;
    raw?: number;
  };
}
