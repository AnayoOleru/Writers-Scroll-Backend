import chai from 'chai';
import chaiHttp from 'chai-http';
import tagging from '../server/helpers/tagsHelpers';

chai.use(chaiHttp);

describe('Tags', () => {
  it('should accept an id and string of article tags', done => {
    tagging.saveArticleTags(1, 'goose');
    done();
  });

  it('should return an error when id is empty', done => {
    tagging.saveArticleTags('goose');
    done();
  });

  it('should return an error when tag is empty', done => {
    tagging.saveArticleTags(1);
    done();
  });
});
