import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

let userBToken;
let userCToken;
let userDToken;

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'sojida@gmail.com',
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
      email: 'vic3coorp@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      userCToken = res.body.user.token;
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
      userDToken = res.body.user.token;
      done();
    });
});

// verifyToken middleware
// Check if payload exist and if payload is not correct'
describe('Check if payload exist and if payload is not correct', () => {
  it("should respond with 401, if there's no token provided", done => {
    chai
      .request(app)
      .get('/api/v1/notifications/7142e4ff-366d-46cc-9384-40eadb3b2626')
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
      .get('/api/v1/notifications/7142e4ff-366d-46cc-9384-40eadb3b2626')
      .set('Authorization', '234567')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.be.equal('Forbidden');
        done();
      });
  });
});

// controller
// update is_seen column for notification
describe('Update is_seen column', () => {
  it('should respond with 200 when no notification is found', done => {
    chai
      .request(app)
      .get('/api/v1/notifications/6517a6ea-662b-4eef-ab9f-20f89bd7099c')
      .set('Authorization', userCToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          'No notification found for this article'
        );
        done();
      });
  });
  it('should respond with 200 when the update is successful', done => {
    chai
      .request(app)
      .get('/api/v1/notifications/fa3def47-153a-40bd-8181-a1c234567876')
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.userID).to.be.a('string');
        expect(res.body.articleID).to.be.a('string');
        expect(res.body.message).to.be.a('string');
        expect(res.body.status).to.be.equal(true);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

// controller
// Get all notification user has not read
describe('Get all notification user has not read', () => {
  it('should respond with 200 when there is no unread notification and when notification count is zero', done => {
    chai
      .request(app)
      .get('/api/v1/notifications')
      .set('Authorization', userDToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          "You don't have any notifications"
        );
        done();
      });
  });
  it('should respond with 200 when getting all notification becomes successful', done => {
    chai
      .request(app)
      .get('/api/v1/notifications')
      .set('Authorization', userCToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
