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
        } = res.body.article;
        expect(res.body.article).to.be.a('object');
        expect(res.body.article).contains({
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
});
