import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

let userAToken;
let userBToken;
let userCToken;

before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'vic3coorp@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      userAToken = res.body.user.token;
      done();
    });
});
before('login user', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'james@gmail.com',
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
      email: 'ameachichuks@gmail.com',
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
      email: 'sojida@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      userCToken = res.body.user.token;
      done();
    });
});

describe('ARTICLE', () => {
  it('should respond with the article', done => {
    chai
      .request(app)
      .get('/api/v1/article/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { id } = res.body.article;
        expect(res.body.article).to.be.a('object');
        expect(id).to.equal('7139d3af-b8b4-44f6-a49f-9305791700f4');
        done();
      });
  });

  it('should respond with invalid UUID error', done => {
    chai
      .request(app)
      .get(`/api/v1/article/7139d3af-b8b4-44f6-a49f-9305791700f4*`)
      .set('Authorization', userAToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('id not valid');
        done();
      });
  });

  it('should respond with article not found', done => {
    chai
      .request(app)
      .get(`/api/v1/article/4139d3af-b8b4-44f6-a49f-9305791700f4`)
      .set('Authorization', userAToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.body[0]).to.equal('Article not found');
        done();
      });
  });

  it('should respond with success: article published successfully ', done => {
    chai
      .request(app)
      .post(`/api/v1/article`)
      .set('Authorization', userBToken)
      .send({
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        is_draft: false,
        title: 'This is the slug we have for you',
        abstract: 'this is required',
        category: 'physics',
        keywords: ['physics', 'chemisty', 'mathematics'],
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Article published successfully');
        done();
      });
  });

  it('should respond with article not found', done => {
    chai
      .request(app)
      .delete(`/api/v1/article/4139d3af-b8b4-44f6-a49f-9305791710f7`)
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.body[0]).to.equal('Article not found');
        done();
      });
  });

  it('should respond with success(without keywords): article published successfully ', done => {
    chai
      .request(app)
      .post(`/api/v1/article`)
      .set('Authorization', userAToken)
      .send({
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        is_draft: false,
        title: 'This is the slug we have for you',
        abstract: 'this is required',
        category: 'physics',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Article published successfully');
        done();
      });
  });

  it('should respond with success: article saved to draft', done => {
    chai
      .request(app)
      .post(`/api/v1/article`)
      .set('Authorization', userAToken)
      .send({
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        is_draft: true,
        title: 'This is the slug we have for you',
        abstract: 'this is required',
        category: 'physics',
        keywords: ['physics', 'chemisty', 'mathematics'],
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Article saved to draft');
        done();
      });
  });

  it('should respond with error: invalid input for draft', done => {
    chai
      .request(app)
      .post(`/api/v1/article`)
      .set('Authorization', userAToken)
      .send({
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        is_draft: true,
        abstract: 'this is required',
        category: 'physics',
        title: 'This',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should respond with error: invalid input for draft', done => {
    chai
      .request(app)
      .post(`/api/v1/article`)
      .set('Authorization', userAToken)
      .send({
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        is_draft: false,
        abstract: 'this is required',
        category: 'physics',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should respond with error: invalid input for draft', done => {
    chai
      .request(app)
      .post(`/api/v1/article`)
      .set('Authorization', userAToken)
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should respond with success: article deleted', done => {
    chai
      .request(app)
      .delete(`/api/v1/article/fb3def47-153c-40bd-8161-a1c787e083d6`)
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Article Deleted Successfully');
        done();
      });
  });

  it('should respond with success: article edited', done => {
    chai
      .request(app)
      .patch(`/api/v1/article/7139d3af-b8b4-44f6-a49f-9305791700f4`)
      .set('Authorization', userAToken)
      .send({
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        is_draft: true,
        title: 'This is the slug we have for you',
        abstract: 'this is required',
        category: 'physics',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Article Updated Successfully');
        done();
      });
  });

  it('should respond with error: invalid id', done => {
    chai
      .request(app)
      .patch(`/api/v1/article/7139d3af-b8b4-44f6-a49f-9305791700f*`)
      .set('Authorization', userAToken)
      .send({
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        is_draft: true,
        title: 'This is the slug we have for you',
        abstract: 'this is required',
        category: 'physics',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('id not valid');
        done();
      });
  });

  it('should respond with error: user does not own this account', done => {
    chai
      .request(app)
      .patch(`/api/v1/article/7139d3af-b8b4-44f6-a49f-9305791700f4`)
      .set('Authorization', userBToken)
      .send({
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        is_draft: true,
        title: 'This is the slug we have for you',
        abstract: 'this is required',
        category: 'physics',
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.equal(
          'User does not own this article'
        );
        done();
      });
  });

  it('should respond with error: invalid input', done => {
    chai
      .request(app)
      .patch(`/api/v1/article/7139d3af-b8b4-44f6-a49f-9305791700f4`)
      .set('Authorization', userBToken)
      .send({
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        is_draft: false,
        title: 'This is the slug we have for you',
        category: 'physics',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('abstract is required');
        done();
      });
  });
  it('should return this user articles', done => {
    chai
      .request(app)
      .get('/api/v1/myArticles')
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          'You have successfully retrieved your articles'
        );
        done();
      });
  });
});

describe('REPORT ARTICLE VALIDATION TEST', () => {
  it('Should throw error if reason is not empty', done => {
    chai
      .request(app)
      .post('/api/v1/article/report/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .send({
        comment: 'the reason i stated up there',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('reason is required');
        done(err);
      });
  });
  it('Should throw error if reason is not a string', done => {
    chai
      .request(app)
      .post('/api/v1/article/report/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .send({
        reason: ['that reason'],
        comment: 'the reason i stated up there',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('reason must be a string');
        done(err);
      });
  });
  it('Should throw error if commentt is not empty', done => {
    chai
      .request(app)
      .post('/api/v1/article/report/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .send({
        reason: 'that reason',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('comment is required');
        done(err);
      });
  });
  it('Should throw error if reason is not a string', done => {
    chai
      .request(app)
      .post('/api/v1/article/report/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .send({
        reason: 'that reason',
        comment: ['the reason i stated up there'],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('comment must be a string');
        done(err);
      });
  });
});

describe('REPORT ARTICLE', () => {
  it('should throw an error if user is not authorized', done => {
    chai
      .request(app)
      .post('/api/v1/article/report/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .send({
        reason: 'that reason',
        comment: 'the reason i stated up there',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.errors.body[0]).to.be.equal('You are not authorized');
        done();
      });
  });

  it('should throw an error if id is invalid', done => {
    chai
      .request(app)
      .post('/api/v1/article/report/7139d3af-b8b4-44f6-a49f-9305791700f*')
      .set('Authorization', userBToken)
      .send({
        reason: 'that reason',
        comment: 'the reason i stated up there',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('id not valid');
        done();
      });
  });

  it('should throw an error article not found', done => {
    chai
      .request(app)
      .post('/api/v1/article/report/7139d3af-b8b4-44f6-a49f-9305791700f1')
      .set('Authorization', userBToken)
      .send({
        reason: 'that reason',
        comment: 'the reason i stated up there',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.body[0]).to.be.equal('Article not found');
        done();
      });
  });

  it('should respond with the reported article', done => {
    chai
      .request(app)
      .post('/api/v1/article/report/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .send({
        reason: 'that reason',
        comment: 'the reason i stated up there',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys('reported', 'message');
        expect(res.body.reported).to.have.keys(
          'id',
          'status',
          'reporter_id',
          'reported_user_id',
          'reported_article_id',
          'reporter_reason',
          'reporter_comment',
          'admin_comment',
          'updatedAt',
          'createdAt',
          'reviewer_id',
          'reviewer_comment'
        );
        expect(res.body.message).to.equal('Article was reported successfully');
        done();
      });
  });
});

describe('ARTICLE', () => {
  it('should respond with the Highlight', done => {
    chai
      .request(app)
      .post('/api/v1/article/highlight/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .send({
        start_position: 1,
        end_position: 5,
        comment: 'I like this article',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.highlight).to.have.keys(
          'id',
          'start_position',
          'end_position',
          'comment',
          'article_id',
          'user_id',
          'updatedAt',
          'createdAt'
        );
        done();
      });
  });
  it('should throw an error if user is nn input is provided', done => {
    chai
      .request(app)
      .post('/api/v1/article/highlight/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.errors.body[0]).to.be.equal('You are not authorized');
        done();
      });
  });
  it('should throw an error if user is not authorized', done => {
    chai
      .request(app)
      .post('/api/v1/article/highlight/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .send({
        start_position: 1,
        end_position: 5,
        comment: 'I like this article',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.errors.body[0]).to.be.equal('You are not authorized');
        done();
      });
  });
  it('should respond with start_position is required', done => {
    chai
      .request(app)
      .post('/api/v1/article/highlight/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .send({
        end_position: 5,
        comment: 'I like this article',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal(
          'start_position is required'
        );
        done();
      });
  });
  it('should respond with end_position is required', done => {
    chai
      .request(app)
      .post('/api/v1/article/highlight/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .send({
        start_position: 1,
        comment: 'I like this article',
      })
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal('end_position is required');
        done();
      });
  });

  it('should respond with error: body required', done => {
    chai
      .request(app)
      .post('/api/v1/article/highlight/7139d3af-b8b4-44f6-a49f-9305791700f4')
      .set('Authorization', userBToken)
      .send({})
      .end((err, res) => {
        expect(res.body.errors.body[0]).to.be.equal('No input provided');
        done();
      });
  });

  it('should respond with success: article reviewed', done => {
    chai
      .request(app)
      .patch('/api/v1/article/review/fa3def47-153a-40bd-8181-a1c787e083d6')
      .set('Authorization', userAToken)
      .send({
        reviewer_comment: 'This is not a good report',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.updatedReview).to.be.a('object');
        expect(res.body.updatedReview.reviewer_comment).to.be.equal(
          'This is not a good report'
        );
        done();
      });
  });

  it('should respond with error: article already reviewed', done => {
    chai
      .request(app)
      .patch('/api/v1/article/review/fa3def47-153a-40bd-8181-a1c787e083d6')
      .set('Authorization', userAToken)
      .send({
        reviewer_comment: 'This is not a good report',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.errors.body[0]).to.be.equal(
          'This article has already been reviewed'
        );
        done();
      });
  });

  it('should respond with error: reviewer is not a reviewer', done => {
    chai
      .request(app)
      .patch('/api/v1/article/review/fa3def47-153a-40bd-8181-a1c787e083d6')
      .set('Authorization', userCToken)
      .send({
        reviewer_comment: 'This is not a good report',
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.be.equal('User is not a reviewer');
        done();
      });
  });

  it('should respond with error: article not found', done => {
    chai
      .request(app)
      .patch('/api/v1/article/review/fa3def47-153a-40bd-8181-a1c787e083d9')
      .set('Authorization', userBToken)
      .send({
        reviewer_comment: 'This is not a good report',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.body[0]).to.be.equal('Article not found');
        done();
      });
  });

  it('should respond with error: reviewer comment is required', done => {
    chai
      .request(app)
      .patch('/api/v1/article/review/fa3def47-153a-40bd-8181-a1c787e083d9')
      .set('Authorization', userBToken)
      .send({ reviewer_comment: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal(
          'Reviewer comment is required'
        );
        done();
      });
  });

  it('should respond with error: id is invalid', done => {
    chai
      .request(app)
      .patch('/api/v1/article/review/fa3def47-153a-40bd-8181-a1c787e083d*')
      .set('Authorization', userBToken)
      .send({ reviewer_comment: 'This is not a good report' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('id not valid');
        done();
      });
  });

  it('should respond with error: No input provided', done => {
    chai
      .request(app)
      .patch('/api/v1/article/review/fa3def47-153a-40bd-8181-a1c787e083d9')
      .set('Authorization', userBToken)
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('No input provided');
        done();
      });
  });
});
describe('ARTICLE STATUS', () => {
  it('should respond with error: No input provided', done => {
    chai
      .request(app)
      .patch('/api/v1/article/status/fa3def47-153a-40bd-8181-a1c787e083d9')
      .set('Authorization', userBToken)
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('No input provided');
        done();
      });
  });
  it('should respond with error: id not invalid', done => {
    chai
      .request(app)
      .patch('/api/v1/article/status/fa3def47-153a-40bd-8181-a1c787e083d*')
      .set('Authorization', userBToken)
      .send({ status: 'accepted' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal('id not valid');
        done();
      });
  });
  it('should respond with error: User is not an admin', done => {
    chai
      .request(app)
      .patch('/api/v1/article/status/fa3def47-153a-40bd-8181-a1c787e083d9')
      .set('Authorization', userCToken)
      .send({ status: 'accepted' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.be.equal('User is not an admin');
        done();
      });
  });
  it('should respond with error: Admin Comment is required', done => {
    chai
      .request(app)
      .patch('/api/v1/article/status/fa3def47-153a-40bd-8181-a1c787e083d9')
      .set('Authorization', userBToken)
      .send({ status: 'accepted' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal(
          'admin_comment is required'
        );
        done();
      });
  });
  it('should respond with error: Status is required', done => {
    chai
      .request(app)
      .patch('/api/v1/article/status/fa3def47-153a-40bd-8181-a1c787e083d9')
      .set('Authorization', userBToken)
      .send({ status: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal(
          'status is not allowed to be empty'
        );
        done();
      });
  });
  it('should respond with error: Status is required', done => {
    chai
      .request(app)
      .patch('/api/v1/article/status/fa3def47-153a-40bd-8181-a1c787e083d9')
      .set('Authorization', userBToken)
      .send({ status: 'unknown' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.be.equal(
          'status must be one of [accepted, rejected]'
        );
        done();
      });
  });
  it('should respond with error: Article not found', done => {
    chai
      .request(app)
      .patch('/api/v1/article/status/7139d3af-b8b4-44f6-a49f-9305791700f9')
      .set('Authorization', userBToken)
      .send({ status: 'accepted', admin_comment: 'yes' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.body[0]).to.be.equal(
          'Article not found or has been reviewed'
        );
        done();
      });
  });
});
