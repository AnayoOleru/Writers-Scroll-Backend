import chai, { expect } from 'chai';
import app from '../server/app';

describe('Article Search', () => {
  const searchFilter = 'a';
  it('Display articles by search filter', done => {
    chai
      .request(app)
      .get(`/api/v1/search?search=${searchFilter}`)
      .end((err, res) => {
        const article = res.body;

        expect(res.status).to.equal(200);
        expect(article).to.be.a('object');

        done();
      });
  });
  it('Display articles by search filter: no empty query', done => {
    chai
      .request(app)
      .get(`/api/v1/search`)
      .end((err, res) => {
        const article = res.body;

        expect(res.status).to.equal(400);
        expect(article).to.be.a('object');

        done();
      });
  });
});
