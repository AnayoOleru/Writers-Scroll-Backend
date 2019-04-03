import models from '../models';
import validations from '../helpers/validations';

const { Article } = models;

const getArticles = async (req, res) => {
  if (validations.validateArticlePage(req.params.page)) {
    const page = parseInt(req.params.page, 10);

    if (page === 0) {
      return res.status(400).json({
        error: {
          page: ['cannot be 0'],
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
      const err = e.parent.hint;
      return res.status(400).json({
        error: {
          hint: [err.replace(/[^a-zA-Z. ]/g, '')],
        },
      });
    }
  }
  return res.status(400).json({
    error: {
      page: ['cannot be anything but numbers'],
    },
  });
};

const Articles = {
  getArticles,
};

export default Articles;
