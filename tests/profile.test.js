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
          first_name: firstname,
          last_name: lastname,
          title,
          phone_number: phonenumber,
          email,
          is_admin: isadmin,
          is_reviewer: isreviewer,
          is_reported: isreported,
          research_field: reserchfield,
          createdAt,
          updatedAt,
        } = res.body.data[0];
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).contains({
          id,
          first_name: firstname,
          last_name: lastname,
          title,
          email,
          phone_number: phonenumber,
          is_admin: isadmin,
          is_reviewer: isreviewer,
          is_reported: isreported,
          research_field: reserchfield,
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
});
