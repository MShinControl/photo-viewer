const app = require('../../server/server.js');
const supertest = require('supertest');
const request = supertest(app);

describe('/images', () => {
  describe('GET', () => {
    let res;
    const url = 'https://picsum.photos/id/';
    beforeAll( async (done) => {
      res = await request.get('/images');
      done();
    });

    it('response should contain a json object with a status code of 200', () => {
      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
    });

    it('body should contain an array of image URLs', () => {
      const { imageUrls } = res.body;
      expect(Array.isArray(imageUrls)).toBe(true);
      expect(imageUrls.length).toBeGreaterThan(0);
      expect(imageUrls.every(el => typeof el === 'string')).toBe(true);
      expect(imageUrls.every(el => el.includes(url))).toBe(true);
    });
  });
});