import { Router } from 'express';
import { upload } from '../../shared/utils/multer.utils';
import { uploadFile } from './upload.controller';

const router = Router();

router.post('/', upload.array('file'), uploadFile);

export default router;
