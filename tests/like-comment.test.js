import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

let userToken;
const baseUrl1 = '/api/v1/comments/0b29d287-0ad0-42ca-8f74-3159bbe304af/likes';
const invalidComment =
  '/api/v1/comments/1a0267aa-dbc2-4b76-a0b0-1d67672febca/likes';
chai.use(chaiHttp);
describe('POST LIKE ON SPECIFIC COMMENTS', () => {
  before(async () => {
    await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Adebisi',
        lastname: 'Adebisi',
        email: 'bukunmi@gmail.com',
        password: 'h0ttestt',
        confirmPassword: 'h0ttestt',
      });

    const userDetails = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'bukunmi@gmail.com',
        password: 'h0ttestt',
      });
    userToken = userDetails.body.user.token;
  });

  it('should return 401 error when no token is provided', done => {
    chai
      .request(app)
      .post(baseUrl1)
      .end((req, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.be.an('object');
        expect(res.body.errors.body[0]).to.equal('You are not authorized');
        done();
      });
  });

  it('should return 403 error when invalid token is provided', done => {
    chai
      .request(app)
      .post(baseUrl1)
      .set('Authorization', 'eeeee')
      .end((req, res) => {
        expect(res.status).to.be.equal(403);
        expect(res).to.be.an('object');
        expect(res.body.errors.body[0]).to.equal('Forbidden');
        done();
      });
  });

  it('should return 404 when comment does not exist', done => {
    chai
      .request(app)
      .post(invalidComment)
      .set('Authorization', userToken)
      .end((req, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.be.an('object');
        expect(res.body.errors.body[0]).to.equal('This comment does not exist');
        done();
      });
  });

  it('should return 201 status code and increment like count on successful like of a comment', done => {
    chai
      .request(app)
      .post(baseUrl1)
      .set('Authorization', userToken)
      .end((req, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.be.an('object');
        expect(res.body.data.likes_count).to.equal(1);
        done();
      });
  });

  it('should return 200 status code and decrement like count on successful like of a comment', done => {
    chai
      .request(app)
      .post(baseUrl1)
      .set('Authorization', userToken)
      .end((req, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.be.an('object');
        expect(res.body.data.likes_count).to.equal(0);
        done();
      });
  });
});
