import { describe, expect, it, vi } from 'vitest';
import { createApp } from '../server';
import request from 'supertest';

vi.mock('pdf-parse');

describe('Health Check', () => {
  it('should return 404 NOT FOUND', async () => {
    const app = createApp();
    const res = await request(app).get('/api/v1/test');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('status', false);
    expect(res.body).toHaveProperty(
      'message',
      'GET /api/v1/test - Path not found'
    );
  });
});
