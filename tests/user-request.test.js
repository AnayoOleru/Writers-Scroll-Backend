import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
let userToken;
let userToken1;

before('login a user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'ameachichuks@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      const { token } = res.body.user;
      expect(res.status).to.equal(200);
      userToken = token;
      done();
    });
});
before('login a user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'sojida@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      const { token } = res.body.user;
      expect(res.status).to.equal(200);
      userToken1 = token;
      done();
    });
});

describe('POST A REQUEST', () => {
  it('It should return a 201 if a user try to make a request twice', done => {
    chai
      .request(app)
      .post('/api/v1/auth/request')
      .set('authorization', userToken1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal(
          'You have successfully made a request'
        );
        done();
      });
  });
  it('It should return a 403 if a user try to make a request twice', done => {
    chai
      .request(app)
      .post('/api/v1/auth/request')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.errors.body[0]).to.equal(
          'You have already made a request'
        );
        done();
      });
  });

  it('It should return a 200 when a user deletes his request ', done => {
    chai
      .request(app)
      .delete('/api/v1/auth/request')
      .set('authorization', userToken1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(
          'You have successfully removed your reviewer request'
        );
        done();
      });
  });
  it('It should return a 403 error for an invalid token', done => {
    chai
      .request(app)
      .post('/api/v1/auth/request')
      .set('authorization', 'eeeeeeeeeeeeeee')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.errors.body[0]).to.be.equal('Forbidden');
        done();
      });
  });
});
