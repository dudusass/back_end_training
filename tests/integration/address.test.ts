import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { executeQueries, readQueries } from '../../src/database/queryUtilts';
import Address from '../../src/interfaces/address';

const dropQuery = readQueries('dropDatabase.sql');

const addr1: Address = {
  city: 'city',
  country: 'country',
  number: '1',
  state: 'state',
  street: 'street'
};

const addr2: Address = {
  city: 'city2',
  country: 'country2',
  number: '2',
  state: 'state2',
  street: 'street2'
};
describe('Address', () => {
  beforeEach(async () => {
    await executeQueries(connection, dropQuery);
    await executeQueries(connection);
  });
  afterAll(async () => {
    await executeQueries(connection, dropQuery);
    await connection.end();
  });

  it('should list no addresses', async () => {
    const result = await request(app).get('/address');
    expect(result.status).toEqual(200);
    expect(result.body).toEqual([]);
  });

  it('should create one address', async () => {
    const result = await request(app).post('/address').send(addr1);
    expect(result.status).toEqual(201);
  });

  it('should return 400 when creating invalid address', async () => {
    const result = await request(app).post('/address').send({ ...addr1, city: '' });
    expect(result.status).toEqual(400);
  });

  it('should list one address', async () => {
    await request(app).post('/address').send(addr1);
    const result = await request(app).get('/address');
    expect(result.body).toEqual(expect.arrayContaining([
      expect.objectContaining(addr1)
    ]));
  });

  it('should list two addresses', async () => {
    await request(app).post('/address').send(addr1);
    await request(app).post('/address').send(addr2);

    const result = await request(app).get('/address');
    expect(result.body).toEqual(expect.arrayContaining([
      expect.objectContaining(addr1),
      expect.objectContaining(addr2),
    ]));
  });

  it('should find one address', async () => {
    await request(app).post('/address').send(addr1);
    const result = await request(app).get('/address/1');
    expect(result.status).toEqual(200);
    expect(result.body).toEqual(expect.objectContaining(addr1));
  });

  it('should return 404 finding inexistent address', async () => {
    await request(app).post('/address').send(addr1);
    const result = await request(app).get('/address/0');
    expect(result.status).toEqual(404);
  });
});