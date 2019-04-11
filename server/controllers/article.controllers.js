import model from '../models';
import validations from '../helpers/validations';
import slugMaker from '../helpers/slug-maker';
import spaceTrimmer from '../helpers/space-trimmer';
import tagsHelpers from '../helpers/tags-helpers';
import serverError from '../helpers/server-error';
import serchDatabase from '../helpers/search-database';
import readingTime from '../helpers/reading-time';
import notifications from '../helpers/notifications';

const { findArticle } = serchDatabase;
const { Article, User, Reported_articles: ReportedArticle, Highlight } = model;

/**
 * @description Get Article
 * @param {*} req
 * @param {*} res
 * @returns {object} response and user profile data
 */
const getOneArticle = async (req, res) => {
  try {
    if (!validations.verifyUUID(req.params.id)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }

    const article = await Article.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: [
            'id',
            'first_name',
            'last_name',
            'title',
            'phone_number',
            'email',
            'bio',
          ],
        },
      ],
    });

    if (!article) {
      return res.status(404).json({
        errors: {
          body: ['Article not found'],
        },
      });
    }

    return res.status(200).json({
      article,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const createArticle = async (req, res) => {
  try {
    req.body.slug = slugMaker(req.body.title);
    if (!req.body.slug) {
      return res.status(400).json({
        errors: {
          body: ['Article must have a title'],
        },
      });
    }

    const { userObj } = req.user;
    req.body.user_id = userObj.id;

    req.body = spaceTrimmer(req.body);
    req.body.reading_time = readingTime(req.body.abstract, req.body.body);
    const article = await Article.create(req.body);

    if (!req.body.is_draft && req.body.keywords) {
      req.body.keywords.forEach(async keyword => {
        await tagsHelpers.saveArticleTags(article.id, keyword);
      });
    }

    if (!req.body.is_draft) {
      notifications.sendEmailNotificationArticle(article.title, userObj.id);
    }

    return res.status(201).json({
      message: validations.draftPublishMessage(article.is_draft),
      article,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    if (!validations.verifyUUID(req.params.id)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }

    const { userObj } = req.user;

    const articleToBeDeleted = await Article.destroy({
      where: {
        id: req.params.id,
        user_id: userObj.id,
      },
    });

    if (!articleToBeDeleted) {
      return res.status(404).json({
        errors: {
          body: ['Article not found'],
        },
      });
    }

    return res.status(200).json({
      message: 'Article Deleted Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const reportArticle = async (req, res) => {
  try {
    const { reason, comment } = req.body;
    const { articleId } = req.params;
    const { id: reporterId } = req.user.userObj;

    // check if the article id has a relationship in the users table
    const { user_id: reportedUserId } = await findArticle(articleId);

    if (!reportedUserId) {
      res.status(404).json({
        errors: {
          body: ['Article not found'],
        },
      });
    }
    const reported = await ReportedArticle.create({
      reporter_id: reporterId,
      reported_user_id: reportedUserId,
      reported_article_id: articleId,
      reporter_reason: reason,
      reporter_comment: comment,
    });

    // once a user is reported, then the user should not be able to review an article
    await User.update(
      { is_reviewer: false, is_reported: true },
      { where: { id: reportedUserId } }
    );

    res.status(200).json({
      reported,
      message: 'Article was reported successfully',
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const editAticle = async (req, res) => {
  try {
    if (!validations.verifyUUID(req.params.id)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }
    const updateBody = spaceTrimmer(req.body);

    const articleToBeUpdated = await Article.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!articleToBeUpdated) {
      return res.status(404).json({
        errors: {
          body: ['Article not found'],
        },
      });
    }

    const { userObj } = req.user;
    if (
      !validations.compareFieldWithToken(userObj.id, articleToBeUpdated.user_id)
    ) {
      return res.status(403).json({
        errors: {
          body: ['User does not own this article'],
        },
      });
    }

    const updatedArticle = await articleToBeUpdated.update(updateBody);

    return res.status(200).json({
      message: 'Article Updated Successfully',
      article: updatedArticle,
    });
  } catch (err) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const createHighlight = async (req, res) => {
  if (!validations.verifyUUID(req.params.articleId)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  req.body = spaceTrimmer(req.body);
  req.body.article_id = req.params.articleId;
  req.body.user_id = req.user.userObj.id;

  const highlight = await Highlight.create(req.body);

  return res.status(200).json({
    highlight,
  });
};

const controller = {
  getOneArticle,
  createArticle,
  deleteArticle,
  reportArticle,
  editAticle,
  createHighlight,
};

export default controller;
