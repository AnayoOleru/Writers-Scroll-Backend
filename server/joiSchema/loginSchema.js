import Joi from 'joi';

const loginSchema = () => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string().required(),
  });
  return schema;
};

export default loginSchema;
