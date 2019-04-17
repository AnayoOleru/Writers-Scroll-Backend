import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

let emailToken;
describe('Reset Password', () => {
  it('should send email notification for password reset', done => {
    chai
      .request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'vic3coorp@gmail.com',
      })
      .end((err, res) => {
        const { data, status } = res.body;
        const { email, message, token } = res.body.data[0];
        emailToken = token;
        expect(status).to.be.equal(200);
        expect(data).to.be.a('array');
        expect(res.body.data[0]).contains({
          email,
          message,
          token,
        });
        done();
      });
  });

  it('should throw an error when email does not exist in db', done => {
    chai
      .request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'testing@gmail.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.body[0]).to.be.equal('Email not found');
        done();
      });
  });

  it('should send throw an error when an invalid email is provided', done => {
    chai
      .request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'testinggmail.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal(
          'Kindly enter a valid email'
        );
        done();
      });
  });

  it('should send throw an error when no email is provides', done => {
    chai
      .request(app)
      .post('/api/v1/auth/reset')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal(
          'Kindly enter a valid email'
        );
        done();
      });
  });
});

describe('UPDATE Password', () => {
  it('should succesfully update password when fields match', done => {
    chai
      .request(app)
      .patch('/api/v1/auth/new-password')
      .send({
        password: '12345asdf',
        confirmPassword: '12345asdf',
      })
      .set('Authorization', emailToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('password reset successful');
        done();
      });
  });

  it('should throw an error when authorization header is missing', done => {
    chai
      .request(app)
      .patch('/api/v1/auth/new-password')
      .send({
        password: '12345asdf',
        confirmPassword: '12345asdf',
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.be.equal(
          'You need to provide a token'
        );
        done();
      });
  });

  it('should not update password when new password is the same as previously forgotten password', done => {
    chai
      .request(app)
      .patch('/api/v1/auth/new-password')
      .send({
        password: '12345asdf',
        confirmPassword: '12345asdf',
      })
      .set('Authorization', emailToken)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.errors.body[0]).to.be.equal(
          'You cannot use an old password'
        );
        done();
      });
  });

  it('should not update password when the fields dont match', done => {
    chai
      .request(app)
      .patch('/api/v1/auth/new-password')
      .send({
        password: '12345asdf',
        confirmPassword: '12345wssasdf',
      })
      .set('Authorization', emailToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('Passwords do not match');
        done();
      });
  });

  it('should throw an error when password is not provided', done => {
    chai
      .request(app)
      .patch('/api/v1/auth/new-password')
      .send({
        confirmPassword: '12345wssasdf',
      })
      .set('Authorization', emailToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('Password is required');
        done();
      });
  });

  it('should throw an error when confirmPassword is not provided', done => {
    chai
      .request(app)
      .patch('/api/v1/auth/new-password')
      .send({
        password: '12345wssasdf',
      })
      .set('Authorization', emailToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal(
          'confirmPassword is required'
        );
        done();
      });
  });

  it('should throw an error when password is not up to length of 8', done => {
    chai
      .request(app)
      .patch('/api/v1/auth/new-password')
      .send({
        password: 'dfd',
        confirmPassword: 'dfdsssnjh',
      })
      .set('Authorization', emailToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('Password is required');
        done();
      });
  });

  it('should throw an error when confirmPassword is not up to length of 8', done => {
    chai
      .request(app)
      .patch('/api/v1/auth/new-password')
      .send({
        password: 'dfddddjk',
        confirmPassword: 'dfd',
      })
      .set('Authorization', emailToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal(
          'confirmPassword is required'
        );
        done();
      });
  });
});
