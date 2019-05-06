import chai, { expect } from 'chai';
import app from '../server/app';

describe('Display articles in pages', () => {
  it('should display articles based on the page number', done => {
    chai
      .request(app)
      .get('/api/v1/articles/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.articles).to.be.a('array');
        expect(res.body.articlesCount).to.be.a('number');

        done();
      });
  });

  it('should display error message because page number is an alphabet', done => {
    chai
      .request(app)
      .get('/api/v1/articles/a')
      .end((err, res) => {
        const errorMessage = res.body.errors.body[0];
        expect(res).to.have.status(400);
        expect(errorMessage).to.be.equal(
          'Page number cannot be anything but numbers'
        );

        done();
      });
  });
});

describe('Get all articles', () => {
  it('should get all articles', done => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.articles).to.be.a('array');
        done();
      });
  });
});
