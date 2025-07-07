import { vi } from 'vitest';

const mockPdfParse = vi.fn(async (buffer) => {
  if (buffer.toString().includes('error')) {
    throw new Error('Mocked parsing error');
  }
  return {
    numpages: 1,
    numrender: 1,
    info: {},
    metadata: {},
    version: '2.0.550',
    text: `Content from buffer`,
    //text: `Content from buffer: ${buffer.toString()}`,
  };
});

export default mockPdfParse;
