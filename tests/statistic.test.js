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

// verifyToken middleware
// Check if payload exist and if payload is not correct'
describe('Check if payload exist and if payload is not correct', () => {
  it("should respond with 401, if there's no token provided", done => {
    chai
      .request(app)
      .get('/api/v1/statistics/daily')
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
      .get('/api/v1/statistics/daily')
      .set('Authorization', '234567')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.be.equal('Forbidden');
        done();
      });
  });
});

// controllers
describe('GET Authors reading statistic for daily', () => {
  it('should respond with 200 when the statistic table is empty', done => {
    chai
      .request(app)
      .get('/api/v1/statistics/daily')
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          'You did not read any article today.'
        );
        done();
      });
  });
  it('should respond with 200 when the user has read a book today', done => {
    chai
      .request(app)
      .get('/api/v1/statistics/daily')
      .set('Authorization', userCToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('Your Reading Statistic Today');
        expect(res.body).to.be.an('object');
        expect(res.body.statistic).to.be.an('string');
        done();
      });
  });
});

// weekly
// controller
describe('GET Authors reading statistic for weekly', () => {
  it('should respond with 200 when the statistic table is empty', done => {
    chai
      .request(app)
      .get('/api/v1/statistics/week')
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          'You did not read any article this week.'
        );
        done();
      });
  });
  it('should respond with 200 when the user has read a book today', done => {
    chai
      .request(app)
      .get('/api/v1/statistics/week')
      .set('Authorization', userCToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          'Your Reading Statistic This Week'
        );
        expect(res.body).to.be.an('object');
        expect(res.body.statistic).to.be.an('string');
        done();
      });
  });
});

// month
// controller
describe('GET Authors reading statistic for monthly', () => {
  it('should respond with 200 when the statistic table is empty', done => {
    chai
      .request(app)
      .get('/api/v1/statistics/month')
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          'You did not read any article this month.'
        );
        done();
      });
  });
  it('should respond with 200 when the user has read a book today', done => {
    chai
      .request(app)
      .get('/api/v1/statistics/month')
      .set('Authorization', userCToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          'Your Reading Statistic This Month'
        );
        expect(res.body).to.be.an('object');
        expect(res.body.statistic).to.be.an('string');
        done();
      });
  });
});
