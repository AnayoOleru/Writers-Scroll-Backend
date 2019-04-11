import sequelize from 'sequelize';
import models from '../models';
import serverError from '../helpers/server-error';

const { Article, User } = models;

const searchArticles = async (req, res) => {
  const authorSearchFilter = req.query.author;
  const titleSearchFilter = req.query.title;

  if (authorSearchFilter && titleSearchFilter) {
    try {
      const filteredArticlesByAuthorAndTitle = await Article.findAll({
        where: {
          user_id: authorSearchFilter,
          title: titleSearchFilter,
        },
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
            where: {
              id: authorSearchFilter,
            },
            attributes: ['first_name', 'last_name'],
          },
        ],
      });
      return res.status(200).json({
        filteredArticlesByAuthorAndTitle,
      });
    } catch (e) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  }

  if (authorSearchFilter) {
    try {
      const seachFilter = sequelize.Op;
      const filteredArticlesByAuthor = await User.findAll({
        where: {
          first_name: {
            [seachFilter.iLike]: `%${authorSearchFilter}%`,
          },
        },
        attributes: ['first_name', 'last_name'],
        include: [
          {
            model: Article,
            attributes: [
              'slug',
              'title',
              'body',
              'createdAt',
              'updatedAt',
              'likes_count',
            ],
          },
        ],
      });
      return res.status(200).json({
        filteredArticlesByAuthor,
      });
    } catch (e) {
      return res.status(500).json({
        errors: e,
      });
    }
  }

  if (titleSearchFilter) {
    try {
      const filteredArticlesByTitle = await Article.findAll({
        where: {
          title: titleSearchFilter,
        },
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
            where: {
              id: authorSearchFilter,
            },
            attributes: ['first_name', 'last_name'],
          },
        ],
      });
      return res.status(200).json({
        filteredArticlesByTitle,
      });
    } catch (e) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  }

  return res.status(200).json({
    message: 'No search filter entered',
  });
};

const Articles = { searchArticles };

export default Articles;
