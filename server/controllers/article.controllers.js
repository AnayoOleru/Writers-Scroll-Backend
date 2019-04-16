import model from '../models';
import validations from '../helpers/validations';
import slugMaker from '../helpers/slug-maker';
import tagsHelpers from '../helpers/tags-helpers';
import serverError from '../helpers/server-error';
import serchDatabase from '../helpers/search-database';
import readingTime from '../helpers/reading-time';
import statistic from '../helpers/statistics-storer';
import notifications from '../helpers/notifications';

const { findArticle } = serchDatabase;
const {
  Article,
  User,
  Reported_articles: ReportedArticle,
  Highlight,
  Like,
  Bookmark,
  Rating,
} = model;

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
        {
          model: Like,
        },
        {
          model: Bookmark,
        },
        {
          model: Rating,
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

    await statistic.saveUserStatistic(req.user.userObj.id, article.id);

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
    // const { user_id: reportedUserId } = await findArticle(articleId);
    const reportedArticle = await findArticle(articleId);

    if (!reportedArticle) {
      return res.status(404).json({
        errors: {
          body: ['Article not found'],
        },
      });
    }
    const reported = await ReportedArticle.create({
      reporter_id: reporterId,
      reported_user_id: reportedArticle.user_id,
      reported_article_id: articleId,
      reporter_reason: reason,
      reporter_comment: comment,
    });

    // once a user is reported, then the user should not be able to review an article
    await User.update(
      { is_reviewer: false, is_reported: true },
      { where: { id: reportedArticle.user_id } }
    );

    return res.status(200).json({
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

    const updatedArticle = await articleToBeUpdated.update(req.body);

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

  req.body.article_id = req.params.articleId;
  req.body.user_id = req.user.userObj.id;

  const highlight = await Highlight.create(req.body);

  return res.status(200).json({
    highlight,
  });
};

const getUserArticles = async (req, res) => {
  const userId = req.user.userObj.id;
  try {
    const findMyArticles = await Article.findAll({
      where: {
        user_id: userId,
        is_reported: false,
      },
    });
    if (findMyArticles.length === 0) {
      return res.status(404).json({
        errors: {
          body: ['You have not written any article on this platform'],
        },
      });
    }
    return res.status(200).json({
      message: 'You have successfully retrieved your articles',
      articles: findMyArticles,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
}
const reviewArticle = async (req, res) => {
  const reviewedArticle = await ReportedArticle.findOne({
    where: {
      reported_article_id: req.params.articleId,
    },
  });

  if (!reviewedArticle) {
    return res.status(404).json({
      errors: {
        body: ['Article not found'],
      },
    });
  }

  if (reviewedArticle.status === 'reviewed') {
    return res.status(409).json({
      errors: {
        body: ['This article has already been reviewed'],
      },
    });
  }

  const values = {
    reviewer_comment: req.body.reviewer_comment,
    status: 'reviewed',
  };

  const updatedReview = await reviewedArticle.update(values);

  return res.status(200).json({
    updatedReview,
  });
};

const controller = {
  getOneArticle,
  createArticle,
  deleteArticle,
  reportArticle,
  editAticle,
  createHighlight,
  getUserArticles,
  reviewArticle,
};

export default controller;
