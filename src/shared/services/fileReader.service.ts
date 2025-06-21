import fs from 'fs';
import pdfParse from 'pdf-parse';
import { createUnexpectedError } from '../utils/error.factory.utils';

export const readPdf = async (filePath: string) => {
  const buffer = fs.readFileSync(filePath);

  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (err: any) {
    console.error('Failed to parse PDF:', err);
    throw createUnexpectedError(err?.message);
  }
};
