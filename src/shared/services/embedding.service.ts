import { pipeline, env } from '@xenova/transformers';
import path from 'path';

env.allowRemoteModels = true;
env.useBrowserCache = false;
env.localModelPath = path.resolve(__dirname, '../../transformers-cache');

export class EmbeddingService {
  private static instance: EmbeddingService;
  private embedder: any;

  private constructor() {}

  public static async getInstance(): Promise<EmbeddingService> {
    if (!EmbeddingService.instance) {
      const instance = new EmbeddingService();
      await instance.init();
      EmbeddingService.instance = instance;
    }
    return EmbeddingService.instance;
  }

  private async init() {
    this.embedder = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
  }

  public async getEmbedding(text: string): Promise<number[]> {
    const output = await this.embedder(text, {
      pooling: 'mean',
      normalize: true,
    });
    return Array.from(output.data);
  }

  public async getAverageEmbedding(texts: string[]): Promise<number[]> {
    const vectors: number[][] = [];

    for (const text of texts) {
      const output = await this.getEmbedding(text);
      vectors.push(output);
    }

    const dimension = vectors[0].length;
    const sum = new Array(dimension).fill(0);

    for (const vec of vectors) {
      for (let i = 0; i < dimension; i++) {
        sum[i] += vec[i];
      }
    }

    return sum.map((val) => val / vectors.length);
  }

  public cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dot = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
    return dot / (mag1 * mag2);
  }
}
