import chai from 'chai';
import nock from 'nock';
import controllers from '../server/controllers';
import app from '../server/app';

const { authController } = controllers;

const { expect } = chai;

const accessToken = 'vubhjnklmewrtyu';
const refreshToken = 'jhvbknhjnkmknkl';
const profile = {
  id: '1234567890',
  emails: [{ value: 'hermes@example.com' }],
  displayName: 'anayo olu',
  provider: 'facebook',
  photos: [{ value: 'image' }],
};

nock('https://www.facebook.com/')
  .filteringPath(() => '/api/v1/auth/facebook')
  .get('/api/v1/auth/facebook')
  .reply(200, 'Facebook connection established');

describe('passport strategy', () => {
  it('should be a function', done => {
    authController.socialCallback(accessToken, refreshToken, profile, done);
    expect(authController.socialCallback).to.be.a('function');
  });

  it('should call facebook route', async () => {
    const response = await chai.request(app).get('/api/v1/auth/facebook');
    expect(response).to.have.status(200);
    expect(response.text).to.be.deep.equal('Facebook connection established');
  });
});
