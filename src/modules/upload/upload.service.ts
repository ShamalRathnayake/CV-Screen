import { logger } from '../../shared/utils/logger.utils';
import { IUploadResponse } from './upload.types';

export const fileUploadService = async (
  files: any
): Promise<IUploadResponse[]> => {
  if (!files || files.length === 0) {
    throw new Error('File not found');
  }

  const res = [];

  for (const file of files) {
    logger.info(`File uploaded: ${file.filename}`);
    res.push({
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    });
  }

  return res;
};
