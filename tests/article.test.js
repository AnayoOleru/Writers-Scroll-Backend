import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

let userAToken;
let userBToken;

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
      email: 'ameachichuks@gmail.com',
      password: '12345678',
    })
    .end((err, res) => {
      userBToken = res.body.user.token;
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
      .set('Authorization', userAToken)
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
          'updatedAt',
          'createdAt',
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
});
