import sequelize from 'sequelize';
import models from '../models';
import serverError from '../helpers/server-error';

const { Article, User, Keyword } = models;

const searchArticles = async (req, res) => {
  const authorSearchFilter = req.query.author;
  const titleSearchFilter = req.query.title;
  const keywordSearchFilter = req.query.keyword;

  if (keywordSearchFilter && authorSearchFilter && titleSearchFilter) {
    try {
      const searchFilter = sequelize.Op;
      const filteredArticlesByKeyword = await Keyword.findAll({
        where: {
          keyword: {
            [searchFilter.iLike]: `%${keywordSearchFilter}%`,
          },
        },
        attributes: ['keyword'],
        include: [
          {
            model: Article,
            as: 'article',
            where: {
              title: {
                [searchFilter.iLike]: `%${titleSearchFilter}%`,
              },
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
                as: 'author',
                where: {
                  first_name: {
                    [searchFilter.iLike]: `%${authorSearchFilter}%`,
                  },
                },
                attributes: ['first_name', 'last_name'],
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        filteredArticlesByKeyword,
      });
    } catch (e) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  }

  if (authorSearchFilter && titleSearchFilter) {
    try {
      const searchFilter = sequelize.Op;
      const filteredArticlesByAuthorAndTitle = await User.findAll({
        where: {
          first_name: {
            [searchFilter.iLike]: `%${authorSearchFilter}%`,
          },
        },
        attributes: ['first_name', 'last_name'],
        include: [
          {
            model: Article,
            as: 'author',
            where: {
              title: {
                [searchFilter.iLike]: `%${titleSearchFilter}%`,
              },
            },
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
        filteredArticlesByAuthorAndTitle,
      });
    } catch (e) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  }

  if (keywordSearchFilter && authorSearchFilter) {
    try {
      const searchFilter = sequelize.Op;
      const filteredArticlesByKeyword = await Keyword.findAll({
        where: {
          keyword: {
            [searchFilter.iLike]: `%${keywordSearchFilter}%`,
          },
        },
        attributes: ['keyword'],
        include: [
          {
            model: Article,
            as: 'article',
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
                where: {
                  first_name: {
                    [searchFilter.iLike]: `%${authorSearchFilter}%`,
                  },
                },
                attributes: ['first_name', 'last_name'],
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        filteredArticlesByKeyword,
      });
    } catch (e) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  }

  if (keywordSearchFilter && titleSearchFilter) {
    try {
      const searchFilter = sequelize.Op;
      const filteredArticlesByKeyword = await Keyword.findAll({
        where: {
          keyword: {
            [searchFilter.iLike]: `%${keywordSearchFilter}%`,
          },
        },
        attributes: ['keyword'],
        include: [
          {
            model: Article,
            as: 'article',
            where: {
              title: {
                [searchFilter.iLike]: `%${titleSearchFilter}%`,
              },
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
                as: 'author',
                attributes: ['first_name', 'last_name'],
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        filteredArticlesByKeyword,
      });
    } catch (e) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  }

  if (authorSearchFilter) {
    try {
      const searchFilter = sequelize.Op;
      const filteredArticlesByAuthor = await User.findAll({
        where: {
          first_name: {
            [searchFilter.iLike]: `%${authorSearchFilter}%`,
          },
        },
        attributes: ['first_name', 'last_name'],
        include: [
          {
            model: Article,
            as: 'author',
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
        errors: serverError(),
      });
    }
  }

  if (titleSearchFilter) {
    try {
      const searchFilter = sequelize.Op;
      const filteredArticlesByTitle = await Article.findAll({
        where: {
          title: {
            [searchFilter.iLike]: `%${titleSearchFilter}%`,
          },
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
            as: 'author',
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

  if (keywordSearchFilter) {
    try {
      const searchFilter = sequelize.Op;
      const filteredArticlesByKeyword = await Keyword.findAll({
        where: {
          keyword: {
            [searchFilter.iLike]: `%${keywordSearchFilter}%`,
          },
        },
        attributes: ['keyword'],
        include: [
          {
            model: Article,
            as: 'article',
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
                attributes: ['first_name', 'last_name'],
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        filteredArticlesByKeyword,
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
