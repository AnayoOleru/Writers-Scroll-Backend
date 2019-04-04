import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdhNmVhLTY2MmItNGVlZi1hYjlmLTIwZjg5YmQ3MDk5YyIsImVtYWlsIjoiYW5heW9AbWFpbC5jb20iLCJleHAiOiI3MmgifQ.qFmqZe1NXLW2YxH6pf8bC-spZlafXGlucfsAjT3L6zE';
describe('LIKE', () => {
  it('should respond with a 201 for Successfully like an article', done => {
    chai
      .request(app)
      .post('/api/v1/likes/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', token)
      .send({
        userId: '6517a6ea-662b-4eef-ab9f-20f89bd7099c', // Id from the seeder
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.be.equal(201);
        expect(res.body.message).to.equal('Successfuly added like');
        done();
      });
  });
});
