import { Router } from 'express';

const router = Router();

router.get('/health', (req, res): void => {
  res.status(200).json({ status: 'ok' });
});

export default router;
