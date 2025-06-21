import multer from 'multer';
import { join } from 'path';
import { randomUUID } from 'crypto';
import fs from 'fs';
import { multerConfig } from '../config/multer.config';
import { createUnsupportedFileType } from './error.factory.utils';

const uploadPath = join(__dirname, multerConfig.path);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${randomUUID()}.${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: multerConfig.maxFileSizeMb * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (multerConfig.allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        createUnsupportedFileType(
          `${file.mimetype} type files are not supported`
        )
      );
    }
  },
});
