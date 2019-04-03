import chai, { expect } from 'chai';
import app from '../server/app';

describe('Display articles in pages', () => {
  it('should display articles based on the page number', done => {
    chai
      .request(app)
      .get('/api/v1/articles/1')
      .end((err, res) => {
        const { articles } = JSON.parse(res.text);
        expect(articles).to.be.a('array');

        done();
      });
  });
});
