const app = require('../server/server.js');
const supertest = require('supertest')
const request = supertest(app);

describe('/', () => {
  describe('GET', () => {
    let res;
    beforeAll( async () => {
      res = await request.get('/');
    })

    it('Serves index.html with a status code 200 & a type that equals text/html', () => {
      expect(res.status).toBe(200);
      expect(res.type).toBe('text/html');
    });
  });
});