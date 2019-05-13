import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

let userToken;
let userToken2;
chai.use(chaiHttp);

const baseUrl = '/api/v1/comments';
const replyUrl = `${baseUrl}/15a2628f-ecf7-4098-8db5-95ecaf24847e/replies`;

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
        password: 'h0=ttestt',
        confirmPassword: 'h0=ttestt',
      });

    const user1 = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'bukunmi@gmail.com',
        password: 'h0=ttestt',
      });
    userToken = user1.body.user.token;

    const user2 = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'vic3coorp@gmail.com',
        password: '12345678',
      });
    userToken2 = user2.body.user.token;
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

describe('GET COMMENTS AND EDIT HISTORIES', () => {
  it('should respond with the comments and its histories', done => {
    chai
      .request(app)
      .get(`${baseUrl}/15a2628f-ecf7-4098-8db5-95ecaf24847e/histories`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.comment).to.be.a('array');
        expect(res.body.comment[0]).have.to.have.all.keys(
          'id',
          'user_id',
          'body',
          'createdAt',
          'histories',
          'likes_count'
        );
        expect(res.body.comment[0].histories[0]).to.have.all.keys(
          'id',
          'body',
          'comment_id',
          'updatedAt'
        );
        expect(res.body.comment[0].histories[0].body).equal('deep write up');
        done();
      });
  });
});

describe('GET COMMENTS AND REPLIES', () => {
  it('should respond with the comments and its replies', done => {
    chai
      .request(app)
      .get(replyUrl)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.comment).to.be.a('array');
        expect(res.body.comment[0]).have.to.have.all.keys(
          'id',
          'likes_count',
          'body',
          'createdAt',
          'replies',
          'user_id'
        );
        done();
      });
  });
});

describe('EDIT COMMENT', () => {
  it('should respond 403 when the user id does not belong to the logged in user id', done => {
    chai
      .request(app)
      .patch('/api/v1/comments/15a2628f-ecf7-4098-8db5-95ecaf24847e')
      .set('Authorization', userToken)
      .send({ body: 'This is a new comment' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.equal(
          'You are not authorized to edit this comment'
        );
        done();
      });
  });

  it('should return 400 with invalid or empty payload(body)', done => {
    chai
      .request(app)
      .patch('/api/v1/comments/15a2628f-ecf7-4098-8db5-95ecaf24847e')
      .set('Authorization', userToken)
      .send({})
      .end((req, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('body is required');
        done();
      });
  });

  it('should respond with status code 200 on successful edit of a comment', done => {
    chai
      .request(app)
      .patch('/api/v1/comments/15a2628f-ecf7-4098-8db5-95ecaf24847e')
      .set('Authorization', userToken2)
      .send({ body: 'This is a new comment' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.editedComment).to.be.a('array');
        expect(res.body.editedComment[0].body).to.equal(
          'This is a new comment'
        );
        done();
      });
  });
});
describe('POST REPLY COMMENT', () => {
  it('should return 400 with invalid or empty payload(reply)', done => {
    chai
      .request(app)
      .post(replyUrl)
      .set('Authorization', userToken)
      .send({})
      .end((req, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('reply is required');
        done();
      });
  });

  it('should respond with status code 201 on successful reply of a comment', done => {
    chai
      .request(app)
      .post(replyUrl)
      .set('Authorization', userToken2)
      .send({ reply: 'This is a new reply' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.response).to.be.an('object');
        expect(res.body.response.reply).to.equal('This is a new reply');
        done();
      });
  });
});

describe('DELETE COMMENT', () => {
  it('should respond 403 when the user id does not belong to the logged in user id', done => {
    chai
      .request(app)
      .delete(`${baseUrl}/0b29d287-0ad0-42ca-8f74-3159bbe304af`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.equal(
          'You are not authorized to delete this comment'
        );
        done();
      });
  });

  it('should respond with status code 200 on successful delete of a comment', done => {
    chai
      .request(app)
      .delete(`${baseUrl}/15a2628f-ecf7-4098-8db5-95ecaf24847e`)
      .set('Authorization', userToken2)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
