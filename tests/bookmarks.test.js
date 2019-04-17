import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
let userToken;
describe('TEST BOOKMARK ROUTE', () => {
  it('logs in a user', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'vic3coorp@gmail.com',
        password: '12345678',
      })
      .end((err, res) => {
        const { token } = res.body.user;
        expect(res.status).to.equal(200);
        userToken = token;
        done();
      });
  });

  it('It should return a 201 if a user successfully bookmarks an article', done => {
    chai
      .request(app)
      .post('/api/v1/bookmarks/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Successfuly added Bookmark');
        done();
      });
  });

  it('It should return a 403 error for an invalid token', done => {
    chai
      .request(app)
      .post('/api/v1/bookmarks/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('authorization', 'eeeeeeeeeeeeeee')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.errors.body[0]).to.be.equal('Forbidden');
        done();
      });
  });
  it('It should return a 401 error for an empty token', done => {
    chai
      .request(app)
      .post('/api/v1/bookmarks/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('authorization', '')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.errors.body[0]).to.be.equal('You are not authorized');
        done();
      });
  });

  it('should have correct bookmark counts', done => {
    chai
      .request(app)
      .get('/api/v1/article/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.article).to.be.a('object');
        expect(res.body.article.bookmark_count).to.be.equal(55);
        done();
      });
  });

  it('It should return a 200 if a user succesfully removes a bookmark', done => {
    chai
      .request(app)
      .post('/api/v1/bookmarks/fa3def47-153a-40bd-8181-a1c787e083d6')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Successfully removed Bookmark');
        done();
      });
  });

  it('should have correct bookmark count when bookmark is removed', done => {
    chai
      .request(app)
      .get('/api/v1/article/fa3def47-153a-40bd-8181-a1c787e083d6')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.article).to.be.a('object');
        expect(res.body.article.bookmark_count).to.be.equal(22);
        done();
      });
  });

  it('should throw a 404 when an article does not exist', done => {
    chai
      .request(app)
      .post('/api/v1/bookmarks/43afd283-c1e9-4d0c-8b4c-f2e7a8a6ac16')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.body[0]).to.equal('This article does not exist');
        done();
      });
  });
});
