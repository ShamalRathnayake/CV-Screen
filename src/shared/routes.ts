import { Router } from 'express';
import uploadRouter from '../modules/upload/upload.router';
import predictionRouter from '../modules/prediction/prediction.router';
import userRouter from '../modules/user/user.router';

const router = Router();

router.get('/health', (req, res): void => {
  res.status(200).json({ success: true });
});

router.use('/upload', uploadRouter);
router.use('/prediction', predictionRouter);
router.use('/user', userRouter);

export default router;
