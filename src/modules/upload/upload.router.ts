import { Router } from 'express';
import { upload } from '../../shared/utils/multer.utils';
import { uploadFile } from './upload.controller';

const router = Router();

router.post('/', upload.single('file'), uploadFile);

export default router;
