import chai, { expect } from 'chai';
import app from '../server/app';

describe('Article Search', () => {
  const articleSearchFilter = 'chemical';
  const authorSearchFilter = 'a';
  const keywordSearchFilter = 'react';
  it('Display articles by search filter', done => {
    chai
      .request(app)
      .get(`/api/v1/search?filter=${articleSearchFilter}`)
      .end((err, res) => {
        const { articleFilter } = res.body;
        expect(res.status).to.equal(200);
        expect(articleFilter).to.be.an('array');
        expect(articleFilter[0].title).to.be.equal('Chemical Properties');
        expect(articleFilter[0].author.first_name).to.be.equal('Ameachi');

        done();
      });
  });
  it('Display author by search filter', done => {
    chai
      .request(app)
      .get(`/api/v1/search?filter=${authorSearchFilter}`)
      .end((err, res) => {
        const { authorFilter } = res.body;
        expect(res.status).to.equal(200);
        expect(authorFilter).to.be.an('array');
        expect(authorFilter[0].first_name).to.be.equal('Anayo');

        done();
      });
  });
  it('Display keyword by search filter', done => {
    chai
      .request(app)
      .get(`/api/v1/search?filter=${keywordSearchFilter}`)
      .end((err, res) => {
        const { keywordFilter } = res.body;
        expect(res.status).to.equal(200);
        expect(keywordFilter).to.be.an('array');
        expect(keywordFilter[0].keyword).to.be.equal('react');

        done();
      });
  });
  it('Display error message if no query string is passed', done => {
    chai
      .request(app)
      .get(`/api/v1/search`)
      .end((err, res) => {
        const article = res.body;
        expect(res.status).to.equal(400);
        expect(article).to.be.a('object');
        expect(article.errors.body[0]).to.be.equal('No search query provided');

        done();
      });
  });
});
