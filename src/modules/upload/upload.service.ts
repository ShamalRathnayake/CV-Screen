import { logger } from '../../shared/utils/logger.utils';

export const fileUploadService = async (file: any) => {
  if (!file) {
    throw new Error('File not found');
  }

  logger.info(`File uploaded: ${file.filename}`);

  return {
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size,
  };
};
