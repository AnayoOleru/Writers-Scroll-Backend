import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

const baseUrl = '/api/v1/auth';

chai.use(chaiHttp);

describe('LOGIN CONTROLLER TEST', () => {
  it('should return an error if email is not in the database', done => {
    chai
      .request(app)
      .post(`${baseUrl}/login`)
      .send({ email: 'tes@gmail.com', password: 'test' })
      .end((err, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(401);
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
        const { status, errors } = res.body;
        expect(status).to.be.equal(401);
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
        const { status, message, user } = res.body;
        expect(status).to.be.equal(200);
        expect(res).to.be.a('object');
        expect(user).to.be.a('object');
        expect(user).to.have.keys('email', 'token', 'bio', 'image');
        expect(message).to.be.equal('Login was successful');
        done();
      });
  });
});
