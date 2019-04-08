import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
let token1;
let token2;
let token3;
describe('TEST USER FOLLOW', () => {
  it('Create a follower', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Daniel',
        lastname: 'chuks',
        email: 'chuksgdf@gmail.com',
        password: 'chuks121',
        confirmPassword: 'chuks121',
      })
      .end((err, res) => {
        const { token } = res.body.user;
        expect(res.status).to.equal(200);
        token1 = token;
        done();
      });
  });
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
        token2 = token;
        done();
      });
  });

  it('It should return a 201 if a user is been followed successfully', done => {
    chai
      .request(app)
      .post('/api/v1/follow/6517a6ea-662b-4eef-ab9f-20f89bd7099c')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Successfully followed user');
        done();
      });
  });

  it('It should return a 403 if you are already following a user', done => {
    chai
      .request(app)
      .post('/api/v1/follow/6517a6ea-662b-4eef-ab9f-20f89bd7099c')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('You are already following');
        done();
      });
  });

  it('It should return a 500 for server error', done => {
    chai
      .request(app)
      .post('/api/v1/follow/6517a6ea-662b-4eef-ab9f-20f89')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Server error');
        done();
      });
  });
  it('It should return a 403 if user try to follow him/herself', done => {
    chai
      .request(app)
      .post('/api/v1/follow/6517a6ea-662b-4eef-ab9f-20f89bd7099c')
      .set('authorization', token2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('You cant follow yourself');
        done();
      });
  });
  it('It should return a 406 if user try to follow him/herself', done => {
    chai
      .request(app)
      .post('/api/v1/follow/6517a6ea-662b-4eef-ab9f-20f89bd7099b')
      .set('authorization', token2)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('User not found');
        done();
      });
  });
});
describe('TEST USER UNFOLLOW', () => {
  it('Create a follower', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Dan',
        lastname: 'chuks',
        email: 'chuks@gmail.com',
        password: 'chuks121',
        confirmPassword: 'chuks121',
      })
      .end((err, res) => {
        const { token } = res.body.user;
        expect(res.status).to.equal(200);
        token3 = token;
        done();
      });
  });
  it('lgoin a user', done => {
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
        token3 = token;
        done();
      });
  });
  it('It should return a 200 status code if user unfollow successfully', done => {
    chai
      .request(app)
      .delete('/api/v1/follow/6517a6ea-662b-4eef-ab9f-20f89bd7099c')
      .set('authorization', token1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal('Successfully unfollowed user');
        done();
      });
  });
});
