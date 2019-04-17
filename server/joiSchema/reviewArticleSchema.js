import Joi from 'joi';

const schema = Joi.object().keys({
  status: Joi.string()
    .required()
    .valid('accepted', 'rejected'),
  admin_comment: Joi.strict().required(),
});

export default schema;
