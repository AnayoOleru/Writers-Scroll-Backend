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
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&=*])[a-zA-Z0-9!@#$%^&=*]{6,16}$/)
      .error(() => 'Password must contain a number, character and alphabet'),
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
