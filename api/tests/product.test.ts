import api from '@/api';
import { establishConnection } from '@/database';
import supertest from 'supertest';
import '@/environment';
import { ProductModel } from '@/models/product.model';
import { productFixtures } from './fixtures/product.fixtures';


let db;
const request = supertest(api);

beforeAll(async () => {
  db = await establishConnection();
  await ProductModel.deleteMany();
  
  productFixtures.forEach(async(p) => await ProductModel.create(p));
})

afterAll(async () => {
  await ProductModel.deleteMany();
  db.connection.close();
});

describe('products endpoint', () => {
  it('should list all products', async () => {
    const response = await request.get('/api/v1/products');
    expect(response.status).toBe(200);

    const products = response.body as any[];

    expect(products).toHaveLength(2);
    expect(products[0]).toHaveProperty('name', 'Windows');
  });

  it('should create a product', async () => {
    const response = await request.post('/api/v1/products').send({ name: 'HelloWorld' });
    expect(response.status).toBe(201);

    const product = response.body;
    expect(product).toHaveProperty('_id');
  });
})
