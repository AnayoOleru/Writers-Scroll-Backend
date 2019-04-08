import chai, { expect } from 'chai';
import app from '../server/app';

const baseUrl = '/api/v1';

describe('LOGIN VALIDATOR TEST', () => {
  it('Should throw error if email is empty', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/login`)
      .send({ email: '', password: 'testingpassword' })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'email is not allowed to be empty'
        );
        done(err);
      });
  });
  it('Should throw error if email is not valid', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/login`)
      .send({ email: 'test', password: 'testingpassword' })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'email must be a valid email'
        );
        done(err);
      });
  });
  it('Should throw error if email is not a string', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/login`)
      .send({ email: ['test'], password: 'testingpassword' })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal('email must be a string');
        done(err);
      });
  });
  it('Should throw error if password is empty', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/login`)
      .send({ email: 'test@gmail.com', password: '' })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'password is not allowed to be empty'
        );
        done(err);
      });
  });
  it('Should throw error if password is not a string', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/login`)
      .send({ email: 'test@gmail.com', password: ['testingpassword'] })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'password must be a string'
        );
        done(err);
      });
  });
});

describe('SIGNUP VALIDATION TEST', () => {
  it('Should throw error if email is empty', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'testing',
        email: '',
        password: 'testingpassword',
        confirmPassword: 'testingpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'email is not allowed to be empty'
        );
        done(err);
      });
  });
  it('Should throw error if email is not valid', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'testing',
        email: 'email',
        password: 'testingpassword',
        confirmPassword: 'testingpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'email must be a valid email'
        );
        done(err);
      });
  });
  it('Should throw error if email is not a string', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'testing',
        email: ['email'],
        password: 'testingpassword',
        confirmPassword: 'testingpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal('email must be a string');
        done(err);
      });
  });
  it('Should throw error if firstname is empty', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: '',
        lastname: 'testing',
        email: 'test@gmail.com',
        password: 'testingpassword',
        confirmPassword: 'testingpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'firstname is not allowed to be empty'
        );
        done(err);
      });
  });
  it('Should throw error if firstname is not a string', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: ['test'],
        lastname: 'testing',
        email: 'test@gmail.com',
        password: 'testingpassword',
        confirmPassword: 'testingpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'firstname must be a string'
        );
        done(err);
      });
  });
  it('Should throw error if lastname is empty', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'test',
        lastname: '',
        email: 'test@gmail.com',
        password: 'testingpassword',
        confirmPassword: 'testingpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'lastname is not allowed to be empty'
        );
        done(err);
      });
  });
  it('Should throw error if lastname is not a string', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'test',
        lastname: ['test'],
        email: 'test@gmail.com',
        password: 'testingpassword',
        confirmPassword: 'testingpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'lastname must be a string'
        );
        done(err);
      });
  });
  it('Should throw error if password is empty', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'testing',
        email: 'test@gmail.com',
        password: '',
        confirmPassword: 'testing',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'password is not allowed to be empty'
        );
        done(err);
      });
  });
  it('Should throw error if password is not a string', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'testing',
        email: 'test@gmail.com',
        password: ['testingpassword'],
        confirmPassword: 'testingpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'password must be a string'
        );
        done(err);
      });
  });
  it('Should throw error if password length is not greater or equals to 8', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'testing',
        email: 'test@gmail.com',
        password: 'test',
        confirmPassword: 'testingpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'password length must be at least 8 characters long'
        );
        done(err);
      });
  });
  it('Should throw error if confirm password is empty', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'testing',
        email: 'test@gmail.com',
        password: 'testing1',
        confirmPassword: '',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'confirmPassword is not allowed to be empty'
        );
        done(err);
      });
  });
  it('Should throw error if password is not a string', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'testing',
        email: 'test@gmail.com',
        password: 'testingpassword',
        confirmPassword: ['testingpassword'],
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'confirmPassword must be a string'
        );
        done(err);
      });
  });
  it('Should throw error if confirmPassword is not equals to password', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/signup`)
      .send({
        firstname: 'Mr test',
        lastname: 'testing',
        email: 'test@gmail.com',
        password: 'testingpassword',
        confirmPassword: 'testing',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal('Passwords do not match');
        done(err);
      });
  });
});
