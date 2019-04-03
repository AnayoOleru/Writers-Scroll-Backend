import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

const rating = {
  user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
  article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
  rating_value: 3,
};

describe('POST RATING', () => {
  it('should return 422 with invalid or empty payload(user_id)', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send({
        article_id: rating.article_id,
        rating_value: rating.rating_value,
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
      .post('/api/v1/rating')
      .send({
        user_id: rating.user_id,
        rating_value: rating.rating_value,
      })
      .end((req, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(422);
        expect(errors.body[0]).to.equal('article_id is required');
        done();
      });
  });

  it('should return 422 with invalid or empty payload(rating_value)', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send({
        user_id: rating.user_id,
        article_id: rating.article_id,
      })
      .end((req, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(422);
        expect(errors.body[0]).to.equal('rating_value is required');
        done();
      });
  });

  it('should return 404 error if article does not exist', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send({
        user_id: rating.user_id,
        article_id: '8139d3af-b8b4-44f6-a49f-9305791700f4',
        rating_value: rating.rating_value,
      })
      .end((req, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(404);
        expect(errors.body[0]).to.equal('Article does not exist');
        done();
      });
  });

  it('should return 422 error if rating value is not between 0 and 5', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send({
        user_id: rating.user_id,
        article_id: rating.article_id,
        rating_value: 7,
      })
      .end((req, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(422);
        expect(errors.body[0]).to.equal(
          'rating_value must be less than or equal to 5'
        );
        done();
      });
  });

  it('should return 201 and rating details on successful post', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send(rating)
      .end((req, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Thank you for rating this article');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.all.keys(
          'user_id',
          'article_id',
          'rating_value',
          'createdAt',
          'updatedAt'
        );
        done();
      });
  });

  it('should return 409 when the same user tries to rate same article again', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send(rating)
      .end((req, res) => {
        const { status, errors } = res.body;
        expect(status).to.be.equal(409);
        expect(errors.body[0]).to.equal(
          'You have already rated this article, thank you!!!'
        );
        done();
      });
  });
});
