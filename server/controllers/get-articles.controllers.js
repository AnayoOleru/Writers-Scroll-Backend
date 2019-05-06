import models from '../models';
import validations from '../helpers/validations';
import serverError from '../helpers/server-error';

const { Article, User, Reported_articles: ReportedArticles } = models;

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
        where: { is_reported: false },
        offset,
        limit: pageSize,
        order: ['title'],
        attributes: [
          'id',
          'slug',
          'title',
          'body',
          'likes_count',
          'reading_time',
          'category',
          'createdAt',
          'updatedAt',
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

const getAllReportedArticles = async (req, res) => {
  try {
    if (!validations.validReportedArticleQueryString(req.query)) {
      return res.status(400).json({
        errors: {
          body: ['Invalid query string'],
        },
      });
    }
    const reportedArticles = await ReportedArticles.findAll({
      where: req.query,
      include: [
        {
          model: Article,
          as: 'article',
        },
      ],
    });

    return res.status(200).json({
      reportedArticles,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    return res.status(200).json({
      articles,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};
const Articles = {
  getArticles,
  getAllReportedArticles,
  getAllArticles,
};

export default Articles;
