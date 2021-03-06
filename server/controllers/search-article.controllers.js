import sequelize from 'sequelize';
import models from '../models';
import serverError from '../helpers/server-error';

const { Article, User, Keyword } = models;

const searchArticles = async (req, res) => {
  try {
    if (!Object.keys(req.query).length) {
      return res.status(400).json({
        errors: {
          body: ['No search query provided'],
        },
      });
    }
    const searchFilter = req.query.filter;
    const limit = 3;
    const articles = Article.findAll({
      limit,
      where: {
        title: {
          [sequelize.Op.iLike]: `%${searchFilter}%`,
        },
      },
      attributes: [
        'id',
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

    const keywords = Keyword.findAll({
      limit,
      where: {
        keyword: {
          [sequelize.Op.iLike]: `%${searchFilter}%`,
        },
      },
      attributes: ['keyword'],
      include: [
        {
          model: Article,
          as: 'article',
          attributes: [
            'id',
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
        },
      ],
    });

    const authors = User.findAll({
      limit,
      where: {
        first_name: {
          [sequelize.Op.iLike]: `%${searchFilter}%`,
        },
      },
      attributes: ['first_name', 'last_name', 'bio', 'image_url'],
      include: [
        {
          model: Article,
          as: 'author',
          attributes: [
            'id',
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

    const [articleFilter, keywordFilter, authorFilter] = await Promise.all([
      articles,
      keywords,
      authors,
    ]);

    return res.status(200).json({
      articleFilter,
      keywordFilter,
      authorFilter,
    });
  } catch (e) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const Articles = { searchArticles };

export default Articles;
