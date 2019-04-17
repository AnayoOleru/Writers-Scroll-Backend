import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
let token1;
describe('TEST LIKE', () => {
  it('lgoin a user', done => {
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
        token1 = token;
        done();
      });
  });

  it('It should return a 201 if a user successfully an article', done => {
    chai
      .request(app)
      .post('/api/v1/likes/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(
          'You have successfuly liked this article'
        );
        done();
      });
  });

  it('It should return a 200 if a user Unlike an article', done => {
    chai
      .request(app)
      .post('/api/v1/likes/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(
          'You have successfully disliked this article'
        );
        done();
      });
  });
  it('It should return a 403 error for an invalid token', done => {
    chai
      .request(app)
      .post('/api/v1/likes/7139d3af-b8b4-44f6-a49f-9305791700f4')
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
      .post('/api/v1/likes/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('authorization', '')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.errors.body[0]).to.be.equal('You are not authorized');
        done();
      });
  });
});
