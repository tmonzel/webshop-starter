import '@/environment';
import api from '@/api';
import { establishConnection } from '@/database';
import supertest from 'supertest';
import { CustomerModel } from '@/models/customer.model';


let db;
const request = supertest(api);

beforeAll(async () => {
  db = await establishConnection();
})

afterAll(async () => {
  CustomerModel.deleteMany();
  db.connection.close();
});

describe('customers endpoint', () => {
  it('should signup a new customer', async () => {
    const response = await request.post('/api/v1/customers').send({ 
      username: 'tom', 
      password: 'hello-world',
      email: 't@t.de',
      firstName: 'Thomas',
      lastName: 'Monzel',
      address: 'SecretStreet 10'
    });

    expect(response.status).toBe(200);
  });
})
