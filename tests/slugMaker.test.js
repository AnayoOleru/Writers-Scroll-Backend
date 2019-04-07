import { expect } from 'chai';
import slugMaker from '../server/helpers/slugMaker';

const articleBody = {
  title: 'This is the title of the year',
  body: 'This is also the body of the year',
};

const articleBodyWithoutTitle = {
  body: 'This is also the body of the year',
};

const articleBodyLessThanFiveWords = {
  body: 'This is',
};

const articleFieldWithoutBodyOrTitle = {
  noTitle: 'This is the title of the year',
  noBody: 'This is also the body of the year',
};

describe('Slugmaker test', () => {
  it('should return with error: invalid seperator type', done => {
    expect(slugMaker(articleBody, 3)).to.equal(false);
    done();
  });

  it('should return with error: body type invalid', done => {
    expect(slugMaker(articleFieldWithoutBodyOrTitle, '**')).to.equal(undefined);
    done();
  });

  it('should return with error: body less than five words', done => {
    expect(slugMaker(articleBodyLessThanFiveWords, '**')).to.equal(false);
    done();
  });

  it('should return with slug: title is present', done => {
    expect(slugMaker(articleBody, '**')).to.equal(
      `This**is**the**title**of**the**year**${Date.now()}`
    );
    done();
  });

  it('should return with slug: body is present', done => {
    expect(slugMaker(articleBodyWithoutTitle, '**')).to.equal(
      `This**is**also**the**body**${Date.now()}`
    );
    done();
  });
});
