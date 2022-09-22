import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { executeQueries, readQueries } from '../../src/database/queryUtilts';

const dropQuery = readQueries('dropDatabase.sql');

describe('Person', () => {
  beforeEach(async () => {
    await executeQueries(connection, dropQuery);
    await executeQueries(connection);
  });
  afterAll(async () => {
    await executeQueries(connection, dropQuery);
    await connection.end();
  });

  it('should list no persons', async () => {
    const result = await request(app).get('/person');
    expect(result.status).toEqual(200);
    expect(result.body).toEqual([]);
  });

  it('should create one person', async () => {
    const result = await request(app).post('/person').send({ name: 'Person' });
    expect(result.status).toEqual(201);
  });

  it('should return 400 when creating invalid person', async () => {
    const result = await request(app).post('/person').send();
    expect(result.status).toEqual(400);
  });

  it('should list one person', async () => {
    await request(app).post('/person').send({ name: 'Person' });
    const result = await request(app).get('/person');
    expect(result.body).toEqual([{ name: 'Person' }]);
  });

  it('should list two persons', async () => {
    await request(app).post('/person').send({ name: 'Person1' });
    await request(app).post('/person').send({ name: 'Person2' });

    const result = await request(app).get('/person');
    expect(result.body).toEqual([{ name: 'Person1' }, { name: 'Person2' }]);
  });

  it('should find one person', async () => {
    await request(app).post('/person').send({ name: 'Person' });
    const result = await request(app).get('/person/1');
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({ name: 'Person' });
  });

  it('should return 404 finding inexistent person', async () => {
    await request(app).post('/person').send({ name: 'Person' });
    const result = await request(app).get('/person/0');
    expect(result.status).toEqual(404);
  });
});