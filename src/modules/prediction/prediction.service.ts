import { existsSync } from 'fs';
import { MakePredictionDTO } from './prediction.dto';
import { multerConfig } from '../../shared/config/multer.config';
import { join } from 'path';
import { createBadRequest } from '../../shared/utils/error.factory.utils';
import { readPdf } from '../../shared/services/fileReader.service';
import { ExtractorService } from '../../shared/services/extractor.service';
import { Transformer } from '../../shared/services/transformer.service';
import { EmbeddingService } from '../../shared/services/embedding.service';

export const makePrediction = async ({
  cvFileName,
  jdFilename,
  jdText,
}: MakePredictionDTO) => {
  try {
    if (!cvFileName) throw new Error('cvFileName is required');

    if (!jdFilename && !jdText)
      throw new Error('jdFilename or jdText is required');

    if (!existsSync(join(__dirname, multerConfig.path, cvFileName)))
      throw new Error('CV not found');

    if (
      jdFilename &&
      !existsSync(join(__dirname, multerConfig.path, jdFilename))
    )
      throw new Error('Job description not found');

    const cvDataAsText = await readPdf(
      join(__dirname, multerConfig.path, cvFileName)
    );

    if (jdFilename) {
      jdText = await readPdf(join(__dirname, multerConfig.path, jdFilename));
    }

    const extractedCv =
      await ExtractorService.getInstance().extractFromCV(cvDataAsText);

    const extractedJD = await ExtractorService.getInstance().extractFromJD(
      jdText || ''
    );

    const preparedCvText =
      await Transformer.prepareCVTextForEmbedding(extractedCv);

    const preparedJdText =
      await Transformer.prepareJDTextForEmbedding(extractedJD);

    const cvEmbedding = await (
      await EmbeddingService.getInstance()
    ).getAverageEmbedding(preparedCvText.combined);

    const technicalEmbedding = await (
      await EmbeddingService.getInstance()
    ).getAverageEmbedding(preparedCvText.technical);

    const educationEmbedding = await (
      await EmbeddingService.getInstance()
    ).getAverageEmbedding(preparedCvText.education);

    const workExpEmbedding = await (
      await EmbeddingService.getInstance()
    ).getAverageEmbedding(preparedCvText.workExp);

    const jdEmbedding = await (
      await EmbeddingService.getInstance()
    ).getAverageEmbedding(preparedJdText);

    const rawCvEmbedding = await (
      await EmbeddingService.getInstance()
    ).getEmbedding(cvDataAsText);

    const rawJdEmbedding = await (
      await EmbeddingService.getInstance()
    ).getEmbedding(jdText as string);

    const cosineSimilarity = {
      total: await (
        await EmbeddingService.getInstance()
      ).cosineSimilarity(cvEmbedding, jdEmbedding),
      technical: await (
        await EmbeddingService.getInstance()
      ).cosineSimilarity(technicalEmbedding, jdEmbedding),
      education: await (
        await EmbeddingService.getInstance()
      ).cosineSimilarity(educationEmbedding, jdEmbedding),
      workExp: await (
        await EmbeddingService.getInstance()
      ).cosineSimilarity(workExpEmbedding, jdEmbedding),
      raw: await (
        await EmbeddingService.getInstance()
      ).cosineSimilarity(rawCvEmbedding, rawJdEmbedding),
    };

    return {
      cosineSimilarity,
      extractedCv,
      extractedJD,
    };
  } catch (error: any) {
    throw createBadRequest(error?.message);
  }
};
