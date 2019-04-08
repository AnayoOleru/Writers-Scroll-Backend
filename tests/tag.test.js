import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import tagging from '../server/helpers/tags-helpers';

chai.use(chaiHttp);

describe('Tags', () => {
  it('should accept an id and string of article tags', async () => {
    const articleTags = await tagging.saveArticleTags(
      '7139d3af-b8b4-44f6-a49f-9305791700f4',
      'Jupiter',
      'Mecury'
    );
    expect(articleTags).to.be.an('object');
  });
});
