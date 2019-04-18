import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

let verifiedReviewerToken;
let userToken;

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'ameachichuks@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      verifiedReviewerToken = res.body.user.token;
      done();
    });
});

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'sojida@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      userToken = res.body.user.token;
      done();
    });
});

chai.use(chaiHttp);

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

describe('GET ALL REPORTED ARTICLES', () => {
  it('should respond with all reported articles', done => {
    chai
      .request(app)
      .get('/api/v1/reported-articles')
      .set('Authorization', verifiedReviewerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.reportedArticles).to.be.a('array');
        done();
      });
  });

  it('should respond with reported articles based on status query string', done => {
    chai
      .request(app)
      .get(`/api/v1/reported-articles?status=pending`)
      .set('Authorization', verifiedReviewerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { status } = res.body.reportedArticles[0];
        expect(status).to.equal('pending');
        done();
      });
  });
  it('should respond with error when the provided parameter is not searchable', done => {
    chai
      .request(app)
      .get(`/api/v1/reported-articles?stats=pending`)
      .set('Authorization', verifiedReviewerToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('Invalid query string');
        done();
      });
  });

  it('should respond with error when the provided user token is neither an admin or a reviwer', done => {
    chai
      .request(app)
      .get(`/api/v1/reported-articles?stats=pending`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.equal(
          'You are not authorized to access this endpoint.'
        );
        done();
      });
  });
});
