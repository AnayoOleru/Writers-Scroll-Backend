import model from '../models';
import serverError from './server-error';

const { User, Article } = model;

const findUser = async email => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return user;
    }
    return null;
  } catch (err) {
    return err;
  }
};

const findArticle = async id => {
  try {
    const article = await Article.findOne({ where: { id } });
    if (article) {
      return article;
    }
    return null;
  } catch (err) {
    return err;
  }
};

const databaseError = async (err, res) => {
  if (err.errors[0].type === 'unique violation') {
    return res.status(409).json({
      errors: {
        body: ['You have already rated this article, thank you!!!'],
      },
    });
  }
  return res.status(500).json({
    errors: serverError(),
  });
};

const search = { findUser, findArticle, databaseError };

export default search;
