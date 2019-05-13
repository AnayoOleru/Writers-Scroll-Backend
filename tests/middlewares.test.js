import chai, { expect } from 'chai';
import app from '../server/app';

const baseUrl = '/api/v1';

describe('LOGIN VALIDATOR TEST', () => {
  it('Should throw error if email is empty', done => {
    chai
      .request(app)
      .post(`${baseUrl}/auth/login`)
      .send({ email: '', password: 'h0=ttesttpassword' })
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
      .send({ email: 'test', password: 'h0=ttesttpassword' })
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
      .send({ email: ['test'], password: 'h0=ttesttpassword' })
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
      .send({ email: 'test@gmail.com', password: ['h0=ttesttpassword'] })
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
        lastname: 'h0=ttestt',
        email: '',
        password: 'h0=ttesttpassword',
        confirmPassword: 'h0=ttesttpassword',
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
        lastname: 'h0=ttestt',
        email: 'email',
        password: 'h0=ttesttpassword',
        confirmPassword: 'h0=ttesttpassword',
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
        lastname: 'h0=ttestt',
        email: ['email'],
        password: 'h0=ttesttpassword',
        confirmPassword: 'h0=ttesttpassword',
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
        lastname: 'h0=ttestt',
        email: 'test@gmail.com',
        password: 'h0=ttesttpassword',
        confirmPassword: 'h0=ttesttpassword',
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
        lastname: 'h0=ttestt',
        email: 'test@gmail.com',
        password: 'h0=ttesttpassword',
        confirmPassword: 'h0=ttesttpassword',
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
        password: 'h0=ttesttpassword',
        confirmPassword: 'h0=ttesttpassword',
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
        password: 'h0=ttesttpassword',
        confirmPassword: 'h0=ttesttpassword',
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
        lastname: 'h0=ttestt',
        email: 'test@gmail.com',
        password: '',
        confirmPassword: 'h0=ttestt',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'Password must contain a number, character and alphabet'
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
        lastname: 'h0=ttestt',
        email: 'test@gmail.com',
        password: ['h0=ttesttpassword'],
        confirmPassword: 'h0=ttesttpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'Password must contain a number, character and alphabet'
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
        lastname: 'h0=ttestt',
        email: 'test@gmail.com',
        password: 'test',
        confirmPassword: 'h0=ttesttpassword',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'Password must contain a number, character and alphabet'
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
        lastname: 'h0=ttestt',
        email: 'test@gmail.com',
        password: 'h0=ttestt1',
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
        lastname: 'h0=ttestt',
        email: 'test@gmail.com',
        password: 'h0=ttesttpassword',
        confirmPassword: ['h0=ttesttpassword'],
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'Password must contain a number, character and alphabet'
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
        lastname: 'h0=ttestt',
        email: 'test@gmail.com',
        password: 'h0=ttesttpassword',
        confirmPassword: 'h0=ttestt',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'Password must contain a number, character and alphabet'
        );
        done(err);
      });
  });
});
