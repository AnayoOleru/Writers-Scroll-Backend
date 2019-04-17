import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import authHelper from '../server/helpers/auth';

const baseUrl = '/api/v1/auth';

chai.use(chaiHttp);

describe('LOGIN CONTROLLER TEST', () => {
  it('should return an error if email is not in the database', done => {
    chai
      .request(app)
      .post(`${baseUrl}/login`)
      .send({ email: 'tes@gmail.com', password: 'test' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { errors } = res.body;
        expect(res).to.be.a('object');
        expect(errors.body[0]).to.be.equal('invalid username and/or password');
        done();
      });
  });
  it('should return an error if password does not match', done => {
    chai
      .request(app)
      .post(`${baseUrl}/login`)
      .send({ email: 'ameachichuks@gmail.com', password: 'testMaster' })
      .end((err, res) => {
        const { errors } = res.body;
        expect(res).to.have.status(401);
        expect(res).to.be.a('object');
        expect(errors.body[0]).to.be.equal('invalid username and/or password');
        done();
      });
  });
  it('should return a token if log in was successfull', done => {
    chai
      .request(app)
      .post(`${baseUrl}/login`)
      .send({ email: 'ameachichuks@gmail.com', password: '12345678' })
      .end((err, res) => {
        const { user } = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(user).to.be.a('object');
        expect(user).to.have.keys('token', 'image');
        done();
      });
  });
});

describe('SIGNUP CONTROLLER TEST', () => {
  it('should return a token on successful registration', done => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send({
        firstname: 'Mrs test',
        lastname: 'testers',
        email: 'mrstest@gmail.com',
        password: 'testing1',
        confirmPassword: 'testing1',
      })
      .end((_err, res) => {
        const { user } = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(user).to.be.a('object');
        expect(user).to.have.keys('email', 'token');
        done();
      });
  });
  it('should return a token on successful registration', done => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'tester',
        email: 'test@test.com',
        password: 'testing1',
        confirmPassword: 'testing1',
      })
      .end((_err, res) => {
        const { user } = res.body;
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(user).to.be.a('object');
        expect(user).to.have.keys('email', 'token');
        done();
      });
  });
});

describe('EMAIL VERIFICATION TEST', () => {
  const token = authHelper.encode({ email: 'test@test.com' });
  it('should verify a user', done => {
    chai
      .request(app)
      .patch(`${baseUrl}/verification/${token}`)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body).to.have.key('message');
        done();
      });
  });
  it('should return an  a user', done => {
    chai
      .request(app)
      .patch(`${baseUrl}/verification/${token}`)
      .end((err, res) => {
        const { errors } = res.body;
        expect(res).to.have.status(403);
        expect(res.body).to.have.keys('errors');
        expect(errors).to.have.keys('body');
        expect(errors.body).to.be.a('array');
        expect(errors.body[0]).to.be.equal(
          'Your account has already been verified'
        );
        done();
      });
  });
});
