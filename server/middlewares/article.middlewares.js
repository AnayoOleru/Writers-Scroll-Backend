import Joi from 'joi';
import joiFormater from '../helpers/joiFormater';
import articleSchema from '../joiSchema/articleSchema';
import publishArticleSchema from '../joiSchema/publishArticleSchema';

const middleware = {
  checkDraftStatus(req, res, next) {
    if (!req.body.is_draft) {
      const { error } = Joi.validate(req.body, publishArticleSchema());

      if (error) {
        const { message } = error.details[0];
        const formatedMessage = joiFormater(message);
        return res.status(400).send({
          message: formatedMessage,
        });
      }
    }

    return next();
  },
  validateArticleBody(req, res, next) {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        error: 'no input provided',
      });
    }

    const { error } = Joi.validate(req.body, articleSchema());

    if (error) {
      const { message } = error.details[0];
      const formatedMessage = joiFormater(message);
      return res.status(400).send({
        message: formatedMessage,
      });
    }

    return next();
  },
};

export default middleware;
