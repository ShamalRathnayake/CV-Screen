export interface MakePredictionDTO {
  cvFileName: string;
  jdFilename?: string;
  jdText?: string;
}

export interface MultiplePredictionDTO {
  cvFileNames: Array<string>;
  jdFilename?: string;
  jdText?: string;
}
