import mongoose, { Schema, Types } from 'mongoose';
import { IPrediction } from './prediction.types';

const predictionSchema = new Schema({
  cvId: {
    type: Types.ObjectId,
    ref: 'cv_data',
    required: true,
  },
  jdId: {
    type: Types.ObjectId,
    ref: 'jd_data',
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'user',
  },
  cosineSimilarity: {
    total: Number,
    technical: Number,
    education: Number,
    workExp: Number,
    raw: Number,
  },
});

export default mongoose.model<IPrediction>('prediction', predictionSchema);
