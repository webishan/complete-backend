const request = require('supertest');
const app = require('../src/app');
const usersController = require('../src/controllers/usersController');

beforeEach(() => {
  usersController._reset();
});

describe('GET /health', () => {
  it('returns status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});

describe('Users API', () => {
  it('GET /api/users returns empty array initially', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/users creates a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ id: 1, name: 'Alice', email: 'alice@example.com' });
  });

  it('POST /api/users returns 400 when fields are missing', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Bob' });
    expect(res.statusCode).toBe(400);
  });

  it('GET /api/users/:id returns a user', async () => {
    await request(app).post('/api/users').send({ name: 'Alice', email: 'alice@example.com' });
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Alice');
  });

  it('GET /api/users/:id returns 404 for unknown user', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toBe(404);
  });

  it('PUT /api/users/:id updates a user', async () => {
    await request(app).post('/api/users').send({ name: 'Alice', email: 'alice@example.com' });
    const res = await request(app).put('/api/users/1').send({ name: 'Alicia' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Alicia');
  });

  it('DELETE /api/users/:id removes a user', async () => {
    await request(app).post('/api/users').send({ name: 'Alice', email: 'alice@example.com' });
    const del = await request(app).delete('/api/users/1');
    expect(del.statusCode).toBe(204);
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(404);
  });
});
