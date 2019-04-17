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

describe('PROFILE', () => {
  it('should respond with the user profile', done => {
    chai
      .request(app)
      .get('/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c')
      .set('Authorization', userAToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { id } = res.body.profile;
        expect(res.body.profile).to.be.a('object');
        expect(id).to.equal('6517a6ea-662b-4eef-ab9f-20f89bd7099c');
        done();
      });
  });

  it('should respond with the user profile and follower status: true', done => {
    chai
      .request(app)
      .get('/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c')
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.isFollower).to.equal(false);
        done();
      });
  });

  it('should respond with the user profile and follower status: false', done => {
    chai
      .request(app)
      .get('/api/v1/profile/7142e4ff-366d-46cc-9384-40eadb3b2626')
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.isFollower).to.equal(true);
        done();
      });
  });

  it('should respond with invalid UUID error', done => {
    chai
      .request(app)
      .get(`/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099*`)
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('id not valid');
        done();
      });
  });

  it('should respond with user based on query string', done => {
    chai
      .request(app)
      .get(`/api/v1/profile?first_name=Ameachi`)
      .set('Authorization', userAToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { first_name: firstname } = res.body.profiles[0];
        expect(firstname).to.equal('Ameachi');
        done();
      });
  });

  it('should respond with error as not a serchable parameter', done => {
    chai
      .request(app)
      .get(`/api/v1/profile?firstname=Ameachi`)
      .set('Authorization', userAToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('Invalid query string');
        done();
      });
  });

  it('should respond with updated user profile', done => {
    chai
      .request(app)
      .patch(`/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c`)
      .set('Authorization', userAToken)
      .send({ first_name: 'Sammy' })
      .end((err, res) => {
        expect(res).to.have.status(200);

        const { firstname } = res.body.profile;
        expect(firstname).to.equal('Sammy');
        done();
      });
  });

  it('should respond with error for updating wrong users profile', done => {
    chai
      .request(app)
      .patch(`/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c`)
      .set('Authorization', userBToken)
      .send({ first_name: 'Sammy' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.equal(
          'User does not own this account'
        );
        done();
      });
  });

  it('should respond with error for no authorization', done => {
    chai
      .request(app)
      .patch(`/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c`)
      .send({ first_name: 'Sammy' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.errors.body[0]).to.equal('You are not authorized');
        done();
      });
  });

  it('should respond with error for bad token', done => {
    chai
      .request(app)
      .patch(`/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c`)
      .set('Authorization', 'fakeToken')
      .send({ first_name: 'Sammy' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.body[0]).to.equal('Forbidden');
        done();
      });
  });

  it('should respond with error for invalid editable field', done => {
    chai
      .request(app)
      .patch(`/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c`)
      .set('Authorization', userAToken)
      .send({ firstname: 'Sammy' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('invalid input properties');
        done();
      });
  });

  it('should respond with error for no body in the request', done => {
    chai
      .request(app)
      .patch(`/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c`)
      .set('Authorization', userAToken)
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('No input provided');
        done();
      });
  });

  it('should respond with error for wrong email input', done => {
    chai
      .request(app)
      .patch(`/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c`)
      .set('Authorization', userAToken)
      .send({ email: 'Sammy' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.body[0]).to.equal('email must be a valid email');
        done();
      });
  });

  it('should respond with an array of suggested followers', done => {
    chai
      .request(app)
      .get(`/api/v1/suggested/researchers`)
      .set('Authorization', userBToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.suggestion).to.be.a('object');
        expect(res.body.suggestion.comments).to.be.a('array');
        expect(res.body.suggestion.likes).to.be.a('array');
        expect(res.body.suggestion.bookmarks).to.be.a('array');
        done();
      });
  });
});
