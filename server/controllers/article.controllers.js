import model from '../models';
import validations from '../helpers/validations';

const { Article } = model;

const controller = {
  /**
   * @description Get Article
   * @param {*} req
   * @param {*} res
   * @returns {object} response and user profile data
   */
  async getOneArticle(req, res) {
    if (!validations.verifyUUID(req.params.id)) {
      return res.status(400).json({
        error: 'id not valid',
      });
    }

    const article = await Article.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!article) {
      return res.status(404).json({
        error: 'Article not found',
      });
    }

    const articleObj = {
      id: article.id,
      author: article.user_id,
      title: article.title,
      slug: article.slug,
      abstract: article.abstract,
      body: article.body,
      category: article.category,
      imageurl: article.image_url,
      bookmarkcount: article.bookmark_count,
      likescount: article.likes_count,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };

    return res.status(200).json({
      data: [articleObj],
    });
  },
};

export default controller;
