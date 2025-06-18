import request from 'supertest';
import { createApp } from '../server';

describe('Health Check', () => {
  it('should return 200 OK', async () => {
    const app = createApp();
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
}); 