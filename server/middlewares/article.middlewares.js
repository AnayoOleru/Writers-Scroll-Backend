import Joi from 'joi';
import joiFormater from '../helpers/joi-formater';
import articleSchema from '../joiSchema/articleSchema';
import publishArticleSchema from '../joiSchema/publishArticleSchema';
import reportArticleSchema from '../joiSchema/reportArticleSchema';
import reviewArticleSchema from '../joiSchema/reviewArticleSchema';
import highlightSchema from '../joiSchema/highlightSchema';
import validations from '../helpers/validations';

const checkDraftStatus = (req, res, next) => {
  if (!req.body.is_draft) {
    const { error } = Joi.validate(req.body, publishArticleSchema());

    if (error) {
      const { message } = error.details[0];
      const formatedMessage = joiFormater(message);
      return res.status(400).send({
        errors: {
          body: [formatedMessage],
        },
      });
    }
  }

  return next();
};

const validateArticleBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      errors: {
        body: ['No input provided'],
      },
    });
  }

  const { error } = Joi.validate(req.body, articleSchema());

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
};

const reportArticleValidator = (req, res, next) => {
  const { comment, reason } = req.body;
  const { error } = Joi.validate({ comment, reason }, reportArticleSchema);

  if (error) {
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);
    return res.status(400).json({
      errors: {
        body: [formatedMessage],
      },
    });
  }
  const { articleId } = req.params;
  if (!validations.verifyUUID(articleId)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  return next();
};

const validateHighlight = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      errors: {
        body: ['No input provided'],
      },
    });
  }

  const { error } = Joi.validate(req.body, highlightSchema());

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
};

const reviewArticleValidator = (req, res, next) => {
  const { articleId } = req.params;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      errors: {
        body: ['No input provided'],
      },
    });
  }

  if (!validations.verifyUUID(articleId)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  if (!req.user.userObj.isReviewer) {
    return res.status(403).json({
      errors: {
        body: ['User is not a reviewer'],
      },
    });
  }

  if (!req.body.reviewer_comment) {
    return res.status(400).json({
      errors: {
        body: ['Reviewer comment is required'],
      },
    });
  }

  return next();
};

const articleStatusValidator = (req, res, next) => {
  const { articleId } = req.params;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      errors: {
        body: ['No input provided'],
      },
    });
  }

  if (!validations.verifyUUID(articleId)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  if (!req.user.userObj.isAdmin) {
    return res.status(403).json({
      errors: {
        body: ['User is not an admin'],
      },
    });
  }

  const { error } = Joi.validate(req.body, reviewArticleSchema);

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
};

const middleware = {
  checkDraftStatus,
  validateArticleBody,
  reportArticleValidator,
  validateHighlight,
  reviewArticleValidator,
  articleStatusValidator,
};

export default middleware;
