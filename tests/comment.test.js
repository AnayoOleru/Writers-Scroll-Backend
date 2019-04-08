import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

let userToken;
chai.use(chaiHttp);
const baseUrl = '/api/v1/comment';

const comment = {
  article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
  body: 'A good comment always refereshes the mind',
};

describe('POST COMMENT', () => {
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
      .post(baseUrl)
      .send({
        article_id: comment.article_id,
        body: comment.body,
      })
      .end((req, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.an('object');
        expect(res.body.errors.body[0]).to.equal('You are not authorized');
        done();
      });
  });

  it('should return 403 error when invalid token is provided', done => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', 'eeeee')
      .send({
        article_id: comment.article_id,
        body: comment.body,
      })
      .end((req, res) => {
        expect(res).to.have.status(403);
        expect(res).to.be.an('object');
        expect(res.body.errors.body[0]).to.equal('Forbidden');
        done();
      });
  });

  it('should return 400 with invalid or empty payload(article_id)', done => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', userToken)
      .send({
        body: comment.body,
      })
      .end((req, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('article_id is required');
        done();
      });
  });

  it('should return 400 with invalid or empty payload(body)', done => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', userToken)
      .send({
        article_id: comment.article_id,
      })
      .end((req, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('body is required');
        done();
      });
  });

  it('should return 404 error if article does not exist', done => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', userToken)
      .send({
        article_id: '2139d3af-b8b4-44f6-a49f-9305791700f4',
        body: comment.body,
      })
      .end((req, res) => {
        const { errors } = res.body;
        expect(res).to.have.status(404);
        expect(errors.body[0]).to.equal('Article does not exist');
        done();
      });
  });

  it('should return 400 error if comment body is more than 250', done => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', userToken)
      .send({
        article_id: comment.article_id,
        body: new Array(300).join('a'),
      })
      .end((req, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal(
          'body length must be less than or equal to 250 characters long'
        );
        done();
      });
  });

  it('should return 201 and comment details on successful post', done => {
    chai
      .request(app)
      .post(baseUrl)
      .set('Authorization', userToken)
      .send(comment)
      .end((req, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
