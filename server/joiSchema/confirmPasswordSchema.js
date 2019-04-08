import Joi from 'joi';

const passwordSchema = Joi.object().keys({
  password: Joi.string()
    .strict()
    .trim()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .min(8)
    .required()
    .error(() => 'Password is required'),
  confirmPassword: Joi.string()
    .strict()
    .trim()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .min(8)
    .required()
    .error(() => 'confirmPassword is required'),
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
