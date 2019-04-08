import Joi from 'joi';

const ratingSchema = () => {
  const schema = Joi.object().keys({
    article_id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
    rating_value: Joi.number()
      .min(0)
      .max(5)
      .required(),
  });
  return schema;
};

export default ratingSchema;
