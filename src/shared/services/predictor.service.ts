// prediction.service.ts
import { readPdf } from './fileReader.service';
import { ExtractorService } from './extractor.service';
import { Transformer } from './transformer.service';
import { EmbeddingService } from './embedding.service';
import { logger } from '../utils/logger.utils';

export class PredictorService {
  private static instance: PredictorService;

  private constructor() {}

  public static getInstance(): PredictorService {
    if (!PredictorService.instance) {
      PredictorService.instance = new PredictorService();
    }
    return PredictorService.instance;
  }

  public async predict(
    cvPaths: string[],
    jdTextOrPath: string,
    isJDPath = false
  ): Promise<any> {
    const jdText = isJDPath ? await readPdf(jdTextOrPath) : jdTextOrPath;

    const extractor = await ExtractorService.getInstance();
    const embedding = await EmbeddingService.getInstance();

    const extractedJD = await extractor.extractFromJD(jdText);

    logger.debug('Extracted JD text');

    const preparedJD = await Transformer.prepareJDTextForEmbedding(extractedJD);

    logger.debug('Prepared JD text');

    const jdEmbedding = await embedding.getAverageEmbedding(preparedJD);

    logger.debug('Embeddings generated for JD');

    const rawJdEmbedding = await embedding.getEmbedding(jdText);

    logger.debug('Embeddings generated for raw JD text');

    const results = await Promise.allSettled(
      cvPaths.map(async (cvPath) => {
        const cvText = await readPdf(cvPath);

        const extractedCv = await extractor.extractFromCV(cvText);

        logger.debug('Extracted CV text');

        const preparedCv =
          await Transformer.prepareCVTextForEmbedding(extractedCv);

        logger.debug('Prepared CV text');

        const [combinedEmbed, techEmbed, eduEmbed, expEmbed, rawCvEmbed] =
          await Promise.all([
            embedding.getAverageEmbedding(preparedCv.combined),
            embedding.getAverageEmbedding(preparedCv.technical),
            embedding.getAverageEmbedding(preparedCv.education),
            embedding.getAverageEmbedding(preparedCv.workExp),
            embedding.getEmbedding(cvText),
          ]);

        logger.debug('Embeddings generated for CV');

        const cosineSimilarity = {
          total: await embedding.cosineSimilarity(combinedEmbed, jdEmbedding),
          technical: await embedding.cosineSimilarity(techEmbed, jdEmbedding),
          education: await embedding.cosineSimilarity(eduEmbed, jdEmbedding),
          workExp: await embedding.cosineSimilarity(expEmbed, jdEmbedding),
          raw: await embedding.cosineSimilarity(rawCvEmbed, rawJdEmbedding),
        };

        return {
          cosineSimilarity,
          extractedCv,
        };
      })
    );

    return {
      extractedJD,
      cvData: results.map((r: any) => r.value),
    };
  }
}
