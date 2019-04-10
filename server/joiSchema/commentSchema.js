import Joi from 'joi';

const postCommentSchema = () => {
  const schema = Joi.object().keys({
    article_id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
    body: Joi.string()
      .min(1)
      .max(250)
      .required(),
  });
  return schema;
};

const editCommentSchema = () => {
  const schema = Joi.object().keys({
    body: Joi.string()
      .min(1)
      .max(250)
      .required(),
  });
  return schema;
};

const commentSchema = { postCommentSchema, editCommentSchema };
export default commentSchema;
