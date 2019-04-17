import models from '../models';
import validations from '../helpers/validations';
import serverError from '../helpers/server-error';

const { Article, User } = models;

const getArticles = async (req, res) => {
  if (validations.validateArticlePage(req.params.page)) {
    const page = parseInt(req.params.page, 10);

    if (page === 0) {
      return res.status(400).json({
        errors: {
          body: ['cannot be 0'],
        },
      });
    }

    const pageSize = 10;

    // offset = (pageSize * page) - pageSize
    const offset = pageSize * page - pageSize;

    try {
      const articles = await Article.findAndCountAll({
        offset,
        limit: pageSize,
        order: ['title'],
        attributes: [
          'slug',
          'title',
          'body',
          'createdAt',
          'updatedAt',
          'likes_count',
        ],
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['first_name', 'last_name', 'bio', 'image_url'],
          },
        ],
      });
      return res.status(200).json({
        articles: articles.rows,
        articlesCount: articles.count,
      });
    } catch (e) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  }
  return res.status(400).json({
    errors: {
      body: ['Page number cannot be anything but numbers'],
    },
  });
};

const Articles = {
  getArticles,
};

export default Articles;
