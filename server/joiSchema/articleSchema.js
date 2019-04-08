import Joi from 'joi';

const articleSchema = () => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(5)
      .max(100)
      .required(),
    abstract: Joi.string()
      .min(5)
      .max(250),
    body: Joi.string().min(5),
    is_draft: Joi.boolean().required(),
    image_url: Joi.string()
      .min(1)
      .max(250),
    keywords: Joi.array().items(Joi.string(), Joi.number()),
    category: Joi.string()
      .min(5)
      .max(50),
  });
  return schema;
};

export default articleSchema;
