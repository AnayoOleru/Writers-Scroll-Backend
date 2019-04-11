import chai, { expect } from 'chai';
import app from '../server/app';

describe('Display articles in pages', () => {
  const authorName = '6517a6ea-662b-4eef-ab9f-20f89bd7099c';
  const tag = '';
  const articleTitle = '';
  it('should display articles based on the page number', done => {
    chai
      .request(app)
      .get(
        `/api/v1/articles/search?author=${authorName}&keyword=${tag}&title=${articleTitle}`
      )
      .end((err, res) => {
        const { articles } = res.body;
        expect(res).to.have(200);
        expect(articles).to.be.a('array');

        done();
      });
  });
});
