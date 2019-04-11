import chai, { expect } from 'chai';
import app from '../server/app';

describe('Article Search', () => {
  const authorName = 'a';
  const keyword = 'react';
  const articleTitle = 'Deep';
  it('Display articles by search filters: author, title and keyword', done => {
    chai
      .request(app)
      .get(
        `/api/v1/search?author=${authorName}&keyword=${keyword}&title=${articleTitle}`
      )
      .end((err, res) => {
        const article = res.body;

        expect(res.status).to.equal(200);
        expect(article).to.be.a('object');

        done();
      });
  });
  it('Display articles by search filters: author and title', done => {
    chai
      .request(app)
      .get(`/api/v1/search?author=${authorName}&title=${articleTitle}`)
      .end((err, res) => {
        const articles = res.body;

        expect(res.status).to.equal(200);
        expect(articles).to.be.a('object');

        done();
      });
  });
  it('Display articles by search filters: author and keyword', done => {
    chai
      .request(app)
      .get(`/api/v1/search?author=${authorName}&keyword=${keyword}`)
      .end((err, res) => {
        const articles = res.body;

        expect(res.status).to.equal(200);
        expect(articles).to.be.a('object');

        done();
      });
  });
  it('Display articles by search filters: keyword and title', done => {
    chai
      .request(app)
      .get(`/api/v1/search?keyword=${keyword}&title=${articleTitle}`)
      .end((err, res) => {
        const articles = res.body;

        expect(res.status).to.equal(200);
        expect(articles).to.be.a('object');

        done();
      });
  });
  it('Display articles by search filter: author', done => {
    chai
      .request(app)
      .get(`/api/v1/search?author=${authorName}`)
      .end((err, res) => {
        const articles = res.body;

        expect(res.status).to.equal(200);
        expect(articles).to.be.a('object');

        done();
      });
  });
  it('Display articles by search filter: keyword', done => {
    chai
      .request(app)
      .get(`/api/v1/search?keyword=${keyword}`)
      .end((err, res) => {
        const articles = res.body;

        expect(res.status).to.equal(200);
        expect(articles).to.be.a('object');

        done();
      });
  });
  it('Display articles by search filter: title', done => {
    chai
      .request(app)
      .get(`/api/v1/search?title=${articleTitle}`)
      .end((err, res) => {
        const articles = res.body;

        expect(res.status).to.equal(200);
        expect(articles).to.be.a('object');

        done();
      });
  });
});
