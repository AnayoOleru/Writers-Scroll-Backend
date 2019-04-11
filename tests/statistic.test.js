import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

let userToken;

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'bright@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      const { token } = res.body.user;
      expect(res.status).to.equal(200);
      userToken = token;
      done();
    });
});

describe('GET Authors reading statistic for daily, weekly and monthly', () => {
  it('should respond with 401 when user-id and id on the params are not the same for daily statistics', done => {
    chai
      .request(app)
      .get('/api/v1/6517a6ea-662b-4eef-ab9f-20f89bd7099c/statistic/daily')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should respond with 401 when user-id and id on the params are not the same', done => {
    chai
      .request(app)
      .get('/api/v1/6517a6ea-662b-4eef-ab9f-20f89bd7099c/statistic/week')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should respond with 400 when UUID is invalid', done => {
    chai
      .request(app)
      .get('/api/v1/6517a6ea-662b-4eef-ab9f-20f89bd70998c/statistic/week')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should respond with 401 when user-id and id on the params are not the same', done => {
    chai
      .request(app)
      .get('/api/v1/6517a6ea-662b-4eef-ab9f-20f89bd7099c/statistic/month')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should respond with 400 when UUID is invalid', done => {
    chai
      .request(app)
      .get('/api/v1/6517a6ea-662b-4eef-ab9f-20f89bd70998c/statistic/month')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
