import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

describe('PROFILE', () => {
  it('should respond with the user profile', done => {
    chai
      .request(app)
      .get('/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c')
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
      .send({ first_name: 'Sammy' })
      .end((err, res) => {
        expect(res).to.have.status(200);

        const { firstname } = res.body.data[0];
        expect(firstname).to.equal('Sammy');
        done();
      });
  });

  it('should respond with error for invalid editable field', done => {
    chai
      .request(app)
      .patch(`/api/v1/profile/6517a6ea-662b-4eef-ab9f-20f89bd7099c`)
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
      .send({ email: 'Sammy' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('email must be a valid email');
        done();
      });
  });
});
