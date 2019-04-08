import models from '../models';
import validations from '../helpers/validations';
import serverError from '../helpers/server-error';

const { Article } = models;

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
      const articles = await Article.findAll({
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
      });

      return res.status(200).json({
        articles,
      });
    } catch (e) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  }
  return res.status(400).json({
    errors: {
      body: ['cannot be anything but numbers'],
    },
  });
};

const Articles = {
  getArticles,
};

export default Articles;
