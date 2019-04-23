import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

let userBToken;
let userCToken;

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'adesojitest22@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      userBToken = res.body.user.token;
      done();
    });
});

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'ameachichuks@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      userCToken = res.body.user.token;
      done();
    });
});

// verifyToken middleware
// Check if payload exist and if payload is not correct'
describe('Check if payload exist and if payload is incorrect', () => {
  it("should respond with 401, if there's no token provided", done => {
    chai
      .request(app)
      .get('/api/v1/bookmarks')
      .set('Authorization', '   ')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.errors.body[0]).to.be.equal('You are not authorized');
        done();
      });
  });

  it('should respond with 403, if token is invalid', done => {
    chai
      .request(app)
      .get('/api/v1/bookmarks')
      .set('Authorization', '234567')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.be.equal('Forbidden');
        done();
      });
  });
});

// controller test
describe('GET articles authors had bookmarked', () => {
  it("should respond with 201 when the user hasn't bookmarked any article yet", done => {
    chai
      .request(app)
      .get('/api/v1/bookmarks')
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.be.equal(
          "You haven't bookmarked any article yet"
        );
        done();
      });
  });
  it('should respond with 201 with the articles, when the user have bookmarked articles', done => {
    chai
      .request(app)
      .get('/api/v1/bookmarks')
      .set('Authorization', userCToken)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.be.equal('Articles you bookmarked');
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
