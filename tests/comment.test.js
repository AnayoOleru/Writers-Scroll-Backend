import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const baseUrl = '/api/v1/comment';

const comment = {
  user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
  article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
  body: 'why did the cat cross the road? makes sense?',
};

describe('POST COMMENT', () => {
  it('should return 422 with invalid or empty payload(user_id)', done => {
    chai
      .request(app)
      .post(baseUrl)
      .send({
        article_id: comment.article_id,
        body: comment.body,
      })
      .end((req, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(422);
        expect(res).to.be.an('object');
        expect(errors.body[0]).to.equal('user_id is required');
        done();
      });
  });

  it('should return 422 with invalid or empty payload(article_id)', done => {
    chai
      .request(app)
      .post(baseUrl)
      .send({
        user_id: comment.user_id,
        body: comment.body,
      })
      .end((req, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(422);
        expect(errors.body[0]).to.equal('article_id is required');
        done();
      });
  });

  it('should return 422 with invalid or empty payload(body)', done => {
    chai
      .request(app)
      .post(baseUrl)
      .send({
        user_id: comment.user_id,
        article_id: comment.article_id,
      })
      .end((req, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(422);
        expect(errors.body[0]).to.equal('body is required');
        done();
      });
  });

  // it('should return 404 error if article does not exist', done => {
  //   chai
  //     .request(app)
  //     .post(baseUrl)
  //     .send({
  //       user_id: comment.user_id,
  //       article_id: comment.article_id,
  //       body: comment.body,
  //     })
  //     .end((req, res) => {
  //       const { status, errors } = res.body;
  //       expect(status).to.be.equal(404);
  //       expect(errors.body[0]).to.equal('Article does not exist');
  //       done();
  //     });
  // });

  it('should return 422 error if comment body is more than 250', done => {
    chai
      .request(app)
      .post(baseUrl)
      .send({
        user_id: comment.user_id,
        article_id: comment.article_id,
        body: new Array(300).join('a'),
      })
      .end((req, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(422);
        expect(errors.body[0]).to.equal(
          'body length must be less than or equal to 250 characters long'
        );
        done();
      });
  });

  it('should return 201 and comment details on successful post', done => {
    chai
      .request(app)
      .post(baseUrl)
      .send(comment)
      .end((req, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'body');
        done();
      });
  });
});
