import Joi from 'joi';

const schema = Joi.object().keys({
  reason: Joi.string().required(),
  comment: Joi.string().required(),
});

export default schema;
