import Joi from 'joi';
import joiFormater from '../helpers/joi-formater';
import profileSchema from '../joiSchema/profileSchema';
import validations from '../helpers/validations';
import models from '../models';

const { Like, User, Article, Comment, Statistic } = models;

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

  async getArticleAuthorUserLike(req, res, next) {
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

    req.suggestions.likes = likes;
    return next();
  },

  async getArticleUserCommented(req, res, next) {
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

    req.suggestions.comments = comments;
    return next();
  },

  async getUserStatistics(req, res, next) {
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

    req.suggestions.statistics = statistics;
    res.send(req.suggestions);
    // return next();
  },
};

export default middleware;
