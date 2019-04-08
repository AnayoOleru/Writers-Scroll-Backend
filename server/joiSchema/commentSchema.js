import Joi from 'joi';

const commentSchema = () => {
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

export default commentSchema;
