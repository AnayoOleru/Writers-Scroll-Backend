import model from '../models';
import serverError from './server-error';

const { User, Article } = model;

const findUser = async email => {
  try {
    return await User.findOne({ where: { email } });
  } catch (err) {
    return err;
  }
};

const findArticle = async id => {
  try {
    return await Article.findOne({ where: { id } });
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
