import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

describe('ARTICLE', () => {
  it('should respond with the article', done => {
    chai
      .request(app)
      .get('/api/v1/article/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .end((err, res) => {
        expect(res).to.have.status(200);
        const {
          id,
          author,
          title,
          slug,
          abstract,
          body,
          category,
          imageurl,
          bookmarkcount,
          likescount,
          createdAt,
          updatedAt,
        } = res.body.data[0];
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).contains({
          id,
          author,
          title,
          slug,
          abstract,
          body,
          category,
          imageurl,
          bookmarkcount,
          likescount,
          createdAt,
          updatedAt,
        });
        done();
      });
  });

  it('should respond with invalid UUID error', done => {
    chai
      .request(app)
      .get(`/api/v1/article/7139d3af-b8b4-44f6-a49f-9305791700f4*`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('id not valid');
        done();
      });
  });

  it('should respond with article not found', done => {
    chai
      .request(app)
      .get(`/api/v1/article/4139d3af-b8b4-44f6-a49f-9305791700f4`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Article not found');
        done();
      });
  });
});