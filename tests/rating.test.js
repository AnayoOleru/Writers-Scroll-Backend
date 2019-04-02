import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

const ratingDetails = {
  user_id: '57c515a1-890d-412f-8ca1-0a5395123dca',
  article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
  rating_value: 3,
};

describe('POST RATING', () => {
  it('should return 404 error if user does not exist', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send({
        user_id: 1,
        article_id: '7139d3af-b8b4-44f6-a49f-9305791700f4',
        rating_value: 3,
      })
      .end((req, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('User does not exist');
        done();
      });
  });

  it('should return 400 error if article does not exist', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send({
        user_id: ratingDetails.user_id,
        article_id: 2,
        rating_value: 3,
      })
      .end((req, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Article does not exist');
        done();
      });
  });

  it('should return 400 error if rating value is not between 0 and 5', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send({
        user_id: ratingDetails.user_id,
        article_id: ratingDetails.article_id,
        rating_value: 7,
      })
      .end((req, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal(
          'Rating value should range from 0 and 5'
        );
        done();
      });
  });

  it('should return 201 and rating details on successful post', done => {
    chai
      .request(app)
      .post('/api/v1/rating')
      .send(ratingDetails)
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
      .send(ratingDetails)
      .end((req, res) => {
        expect(res).to.have.status(409);
        expect(res.body.error).to.equal(
          'You have already rated this article, thank you!!!'
        );
        done();
      });
  });
});
