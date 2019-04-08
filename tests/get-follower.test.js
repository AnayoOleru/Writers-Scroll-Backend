import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

let token1;
let token2;

before('login user', done => {
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
      token1 = token;
      done();
    });
});
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
      token2 = token;
      done();
    });
});

describe('GET FOLLOWERS', () => {
  it('should respond with the followers', done => {
    chai
      .request(app)
      .get('/api/v1/followers')
      .set('Authorization', token1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.followers).to.be.a('array');
        expect(res.body.message).to.be.a('string');
        expect(res.body.followers[0]).have.property('id');
        expect(res.body.followers[0]).have.property('followee_id');
        expect(res.body.followers[0]).have.property('follower_id');

        done();
      });
  });
  it('should respond a 200 status code for followers list', done => {
    chai
      .request(app)
      .get('/api/v1/followers')
      .set('Authorization', token2)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.followers).to.be.a('array');
        done();
      });
  });
});
describe('GET FOLLOWING', () => {
  it('should respond with the following', done => {
    chai
      .request(app)
      .get('/api/v1/following')
      .set('Authorization', token1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.following).to.be.a('array');
        expect(res.body.message).to.be.a('string');
        expect(res.body.following[0]).have.property('id');
        expect(res.body.following[0]).have.property('follower_id');
        expect(res.body.following[0]).have.property('followee_id');
        done();
      });
  });
});
