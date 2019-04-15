import Joi from 'joi';
import joiFormater from '../helpers/joi-formater';
import commentSchema from '../joiSchema/commentSchema';
import models from '../models';
import validations from '../helpers/validations';
import commentHelper from '../helpers/comment-helpers';

const { Comment } = models;

const validatePostComment = (req, res, next) => {
  const { error } = Joi.validate(req.body, commentSchema.postCommentSchema());

  if (error) {
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);
    return res.status(400).json({
      errors: {
        body: [formatedMessage],
      },
    });
  }
  return next();
};

const validateEditComment = (req, res, next) => {
  const { error } = Joi.validate(req.body, commentSchema.editCommentSchema());

  if (error) {
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);
    return res.status(400).json({
      errors: {
        body: [formatedMessage],
      },
    });
  }
  return next();
};

const validateReplyComment = (req, res, next) => {
  const { error } = Joi.validate(req.body, commentSchema.replyCommentSchema());

  if (error) {
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);
    return res.status(400).json({
      errors: {
        body: [formatedMessage],
      },
    });
  }
  return next();
};

const verifyComment = async (req, res, next) => {
  if (!validations.verifyUUID(req.params.commentid)) {
    return res.status(400).json({
      errors: {
        body: ['id not valid'],
      },
    });
  }

  const comment = await commentHelper.getComment(Comment, req.params.commentid);
  if (!comment) {
    return res.status(404).json({
      errors: {
        body: ['This comment does not exist'],
      },
    });
  }
  res.locals.comment = comment;
  next();
};

export default {
  validatePostComment,
  validateEditComment,
  validateReplyComment,
  verifyComment,
};
