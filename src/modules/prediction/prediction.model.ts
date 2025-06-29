import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  cv_id: {
    type: mongoose.Types.ObjectId,
    ref: 'cv_data',
    required: true,
  },
  jd_id: {
    type: mongoose.Types.ObjectId,
    ref: 'jd_data',
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
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

export default mongoose.model('prediction', predictionSchema);
