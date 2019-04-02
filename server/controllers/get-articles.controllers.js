import models from '../models';

const { Article } = models;

const getArticles = async (req, res) => {
  const { page } = req.params;
  const perPage = 10;

  const offset = perPage * page - perPage;

  const articles = await Article.findAll({
    offset,
    limit: perPage,
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
};

const Articles = {
  getArticles,
};

export default Articles;
