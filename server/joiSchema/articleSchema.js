import Joi from 'joi';

const articleSchema = () => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(5)
      .required(),
    abstract: Joi.string()
      .allow('')
      .allow(null),
    body: Joi.string()
      .allow('')
      .allow(null),
    is_draft: Joi.boolean().required(),
    image_url: Joi.string()
      .allow('')
      .allow(null),
    keywords: Joi.array().items(Joi.string(), Joi.number()),
    category: Joi.string()
      .allow('')
      .allow(null),
  });
  return schema;
};

export default articleSchema;
