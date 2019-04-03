import Joi from 'joi';

const signupSchema = () => {
  const schema = Joi.object().keys({
    firstname: Joi.string()
      .min(3)
      .max(30)
      .required(),
    lastname: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .min(8)
      .alphanum()
      .required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match',
          },
        },
      }),
  });
  return schema;
};

export default signupSchema;
