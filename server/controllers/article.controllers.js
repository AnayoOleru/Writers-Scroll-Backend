import model from '../models';
import validations from '../helpers/validations';
import slugMaker from '../helpers/slugMaker';
import spaceTrimmer from '../helpers/spaceTrimmer';
import tagsHelpers from '../helpers/tagsHelpers';

const { Article } = model;

const controller = {
  /**
   * @description Get Article
   * @param {*} req
   * @param {*} res
   * @returns {object} response and user profile data
   */
  async getOneArticle(req, res) {
    try {
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
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Oops! There seems to be a database error',
      });
    }
  },
  async createArticle(req, res) {
    try {
      req.body.slug = slugMaker(req.body, '**');
      if (!req.body.slug) {
        return res.status(400).json({
          error: 'Article must have body or title',
        });
      }

      if (!req.body.title) {
        req.body.title = 'Draft';
      }

      const { userObj } = req.user;
      req.body.user_id = userObj.id;

      req.body = spaceTrimmer(req.body);
      const article = await Article.create(req.body);

      if (!req.body.is_draft) {
        if (req.body.keywords) {
          req.body.keywords.forEach(async keyword => {
            await tagsHelpers.saveArticleTags(article.id, keyword);
          });
        }
      }

      return res.status(201).json({
        message: validations.draftPublishMessage(article.is_draft),
        data: article,
      });
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Oops! There seems to be a database error',
      });
    }
  },
};

export default controller;
