import { expect } from 'chai';
import slugMaker from '../server/helpers/slug-maker';

const title = 'This is the title of the year';

describe('Slugmaker test', () => {
  it('should return slug', done => {
    expect(slugMaker(title)).to.equal(
      `This-is-the-title-of-the-year-${Date.now()}`
    );
    done();
  });

  it('should return with false', done => {
    expect(slugMaker()).to.equal(false);
    done();
  });
});
