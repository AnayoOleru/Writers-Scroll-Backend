import model from '../models';

const { User, Article } = model;

const search = {
  findUser: async email => {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        return user;
      }
      return null;
    } catch (err) {
      return err;
    }
  },
  findArticle: async id => {
    try {
      const article = await Article.findOne({ where: { id } });
      if (article) {
        return article;
      }
      return null;
    } catch (err) {
      return err;
    }
  },

  databaseError: async (err, res) => {
    if (err.errors[0].type === 'unique violation') {
      res.status(409).json({
        status: 409,
        errors: {
          body: ['You have already rated this article, thank you!!!'],
        },
      });
    } else {
      res.status(500).json({
        status: 500,
        errors: {
          body: [err.errors[0].message],
        },
      });
    }
  },
};

export default search;
