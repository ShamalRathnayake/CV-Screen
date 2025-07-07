import { vi, describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../server';

vi.mock('pdf-parse');

describe('Health Check', () => {
  it('should return 200 OK', async () => {
    const app = createApp();
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
  });
});
