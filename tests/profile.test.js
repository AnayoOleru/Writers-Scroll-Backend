import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

let userAToken;
let userBToken;

before('login admin', done => {
  chai
    .request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'anayo@mail.com',
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
        const {
          id,
          firstname,
          lastname,
          title,
          phonenumber,
          email,
          isreviewer,
          researchfield,
          createdAt,
          updatedAt,
        } = res.body.data[0];
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).contains({
          id,
          firstname,
          lastname,
          title,
          email,
          phonenumber,
          isreviewer,
          researchfield,
          createdAt,
          updatedAt,
        });
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
        expect(res.body.error).to.equal('id not valid');
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
        const { first_name: firstname } = res.body.data[0];
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
        expect(res.body.error).to.equal('invalid query sring');
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

        const { firstname } = res.body.data[0];
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
        expect(res.body.error).to.equal('User does not own this account');
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
        expect(res.body.error).to.equal('You are not authorized');
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
        expect(res.body.error).to.equal('Forbidden');
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
        expect(res.body.error).to.equal('invalid input properties');
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
        expect(res.body.error).to.equal('no input provided');
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
        expect(res.body.message).to.equal('email must be a valid email');
        done();
      });
  });
});
