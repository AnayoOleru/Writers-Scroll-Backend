import cron from 'node-cron';
import model from '../models';

const { Article } = model;
const articleJob = () =>
  cron.schedule('00 00 00 * * *', async () => {
    const articles = await Article.findAll({ where: { is_reported: true } });
    const compareDate = previousDate => {
      const today = new Date().getTime();
      const previousDay = previousDate.getTime();
      const timeDiff = today - previousDay;
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };
    articles.map(article => {
      const { updatedAt, id } = article.dataValues;
      const diff = compareDate(updatedAt);
      if (diff > 2) {
        return Article.destroy({ where: { id } });
      }
      return null;
    });
  });

export default articleJob;
