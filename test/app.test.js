const request = require('supertest');
const app = require('../server'); // caminho para seu app

describe('GET /questoes', () => {
  it('deve retornar status 200 e um array de questões', async () => {
    const res = await request(app).get('/questoes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    // opcional: testa um campo da primeira questão
    expect(res.body[0]).toHaveProperty('enunciado');
  });
});
