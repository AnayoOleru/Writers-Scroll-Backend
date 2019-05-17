import Joi from 'joi';

const passwordSchema = Joi.object().keys({
  password: Joi.string()
    .strict()
    .trim()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .min(8)
    .required()
    .error(
      () =>
        `Password must be greater than 8 and should contain at least one upper case letter, one lower case letter, one digit and one special character`
    ),
  confirmPassword: Joi.string()
    .strict()
    .trim()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .min(8)
    .required()
    .error(() => 'Confirm Password is required'),
});

const emailSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .strict()
    .trim()
    .min(2)
    .required()
    .error(() => 'Kindly enter a valid email'),
});

const resetPasswordSchema = { passwordSchema, emailSchema };

export default { resetPasswordSchema };
