import '@/environment';
import api from '@/api';
import { establishConnection } from '@/database';
import supertest from 'supertest';


let db;
const request = supertest(api);

beforeAll(async () => {
  db = await establishConnection();
})

afterAll(async () => {
  db.connection.close();
});

describe('orders endpoint', () => {
  it('should fail accessing protected orders without token', async () => {
    const response = await request.get('/api/v1/orders');
    expect(response.status).toBe(401);
  });
})
