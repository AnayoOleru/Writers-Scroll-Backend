import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdhNmVhLTY2MmItNGVlZi1hYjlmLTIwZjg5YmQ3MDk5YyIsImVtYWlsIjoiYW5heW9AbWFpbC5jb20iLCJleHAiOiI3MmgifQ.qFmqZe1NXLW2YxH6pf8bC-spZlafXGlucfsAjT3L6zE';
describe.only('LIKE', () => {
  it('should respond on Successfully ', done => {
    chai
      .request(app)
      .post('/api/v1/likes/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Successfully remove like');
        done();
      });
  });
});
