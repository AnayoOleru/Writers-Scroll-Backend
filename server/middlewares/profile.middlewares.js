import Joi from 'joi';
import joiFormater from '../helpers/joi-formater';
import profileSchema from '../joiSchema/profileSchema';
import validations from '../helpers/validations';
import models from '../models';
import getAuthorsId from '../helpers/aurhors-id-helper';
import serverError from '../helpers/server-error';

const { Like, User, Article, Comment, Statistic, Bookmark } = models;

const middleware = {
  validateUpdateProfile(req, res, next) {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        errors: {
          body: ['No input provided'],
        },
      });
    }

    if (!validations.validEditableProfileBody(req.body)) {
      return res.status(400).json({
        errors: {
          body: ['invalid input properties'],
        },
      });
    }

    const { error } = Joi.validate(req.body, profileSchema());

    if (error) {
      const { message } = error.details[0];
      const formatedMessage = joiFormater(message);
      return res.status(400).send({
        errors: {
          body: [formatedMessage],
        },
      });
    }

    return next();
  },

  async getAuthorOfArticleUserLiked(req, res, next) {
    try {
      req.suggestions = {};
      const userId = req.user.userObj.id;

      const likes = await Like.findAll({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: Article,
            attributes: ['title'],
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'first_name', 'last_name'],
              },
            ],
          },
        ],
      });

      req.suggestions.likes = getAuthorsId(req, likes);
      return next();
    } catch (error) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  },

  async getAuthorOfArticleUserBookmarked(req, res, next) {
    try {
      const userId = req.user.userObj.id;

      const bookmarks = await Bookmark.findAll({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: Article,
            attributes: ['title'],
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'first_name', 'last_name'],
              },
            ],
          },
        ],
      });

      req.suggestions.bookmarks = getAuthorsId(req, bookmarks);
      return next();
    } catch (err) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  },

  async getAuthorOfArticleUserCommented(req, res, next) {
    try {
      const userId = req.user.userObj.id;

      const comments = await Comment.findAll({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: Article,
            attributes: ['title'],
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'first_name', 'last_name'],
              },
            ],
          },
        ],
      });

      req.suggestions.comments = getAuthorsId(req, comments);
      return next();
    } catch (error) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  },

  async getAuthorOfUserStatistics(req, res, next) {
    try {
      const userId = req.user.userObj.id;

      const statistics = await Statistic.findAll({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: Article,
            attributes: ['title'],
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'first_name', 'last_name'],
              },
            ],
          },
        ],
      });

      req.suggestions.statistics = getAuthorsId(req, statistics);
      return next();
    } catch (error) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  },
};

export default middleware;
