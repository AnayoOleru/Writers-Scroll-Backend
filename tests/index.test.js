import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

describe('HOMEPAGE', () => {
  it('should respond with welcome message', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should respond with invalid route error', done => {
    chai
      .request(app)
      .get('/thisisaninvalidroute')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
