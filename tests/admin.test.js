import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
let token1;
describe('TEST FOR ADMIN', () => {
  it('login an admin', done => {
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

  it('It should return a 200 status code on giving a user a reviewer access', done => {
    chai
      .request(app)
      .patch('/api/v1/admin/7142e4ff-366d-46cc-9384-40eadb3b2626/upgrades')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(
          'You have granted a user reviewer access'
        );
        done();
      });
  });
  it('It should return a 200 status code on giving a user a reviewer access', done => {
    chai
      .request(app)
      .patch('/api/v1/admin/7142e4ff-366d-46cc-9384-40eadb3b2626/downgrades')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(
          'You have removed a user reviewer access'
        );
        done();
      });
  });
  it('It should return a 401 error for an empty token', done => {
    chai
      .request(app)
      .patch('/api/v1/admin/57c515a1-890d-412f-8ca1-0a5395123dca/upgrades')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.be.equal('You are already an admin');
        done();
      });
  });
  it('It should return a 404 error if Id is invalid', done => {
    chai
      .request(app)
      .patch('/api/v1/admin/57c515a1-890d-412f-8ca1-0a5395123dc/upgrades')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('id not valid');
        done();
      });
  });
  it('It should return a 401 error for an empty token', done => {
    chai
      .request(app)
      .patch('/api/v1/admin/57c515a1-890d-412f-8ca1-0a5395123dc/upgrades')
      .set('authorization', '')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.errors.body[0]).to.be.equal('You are not authorized');
        done();
      });
  });
  it('It should return all users request', done => {
    chai
      .request(app)
      .get('/api/v1/admin/reviewer')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          'List of users requesting to be reviewers'
        );
        done();
      });
  });
  it('It should return all reviewers', done => {
    chai
      .request(app)
      .get('/api/v1/admin/reviewers')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          'List of users that are reviewers'
        );
        done();
      });
  });
});
