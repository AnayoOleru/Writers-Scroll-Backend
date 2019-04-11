import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import statistic from '../server/helpers/statistics-storer';

chai.use(chaiHttp);

describe('Statistic storer function', () => {
  it('should accept a userId and aticleId and store it to the statistic table', async () => {
    const statisticStore = await statistic.saveUserStatistic(
      '2242e4ff-366d-46cc-9384-40eadb3b2644',
      '7139d3af-b8b4-44f6-a49f-9305791700f4'
    );
    expect(statisticStore).to.be.an('object');
  });
});
