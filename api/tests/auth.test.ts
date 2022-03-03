import '@/environment';
import api from '@/api';
import { establishConnection } from '@/database';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import { CustomerModel } from '@/models/customer.model';
import { UserRoles } from '@/models/user.model';


let db;
const request = supertest(api);

beforeAll(async () => {
  db = await establishConnection();

  // Create customer
  await CustomerModel.create({
    username: 'tom',
    password: bcrypt.hashSync('hello-world', 8),
    roles: [ UserRoles.CUSTOMER ],
    firstName: 'Thomas',
    lastName: 'Monzel',
    address: 'SecretStreet 10',
    email: 'test@test.de'
});
})

afterAll(async () => {
  CustomerModel.deleteMany();
  db.connection.close();
});

describe('auth endpoint', () => {
  it('should login with customer auth', async () => {
    const response = await request.post('/api/v1/auth/login').send({ username: 'tom', password: 'hello-world' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
})
