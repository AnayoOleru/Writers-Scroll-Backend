import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import statistic from '../server/helpers/statistics-storer';

chai.use(chaiHttp);

describe('Tags', () => {
  it('should accept an id and string of article tags', async () => {
    const statisticStore = await statistic.saveUserStatistic(
      '7139d3af-b8b4-44f6-a49f-9305791700f4',
      '7139d3af-b8b4-44f6-a49f-9305791700f4'
    );
    expect(statisticStore).to.be.an('object');
  });
});
