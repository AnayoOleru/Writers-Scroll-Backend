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

  it('should display error message because page number is an alphabet', done => {
    chai
      .request(app)
      .get('/api/v1/articles/a')
      .end((err, res) => {
        const errorMessage = res.body.errors.body[0];
        expect(errorMessage).to.be.equal('cannot be anything but numbers');

        done();
      });
  });
});
