import models from '../models';
import serverError from './server-error';

const { Statistic } = models;

/**
 *
 * @param {*} userId
 * @param {*} articleId
 * @returns {*}  userId, articleId in .
 */
const saveUserStatistic = async (userId, articleId) => {
  try {
    await Statistic.create({
      user_id: userId,
      article_id: articleId,
    });
  } catch (err) {
    return serverError();
  }
};

const statistic = { saveUserStatistic };

export default statistic;
