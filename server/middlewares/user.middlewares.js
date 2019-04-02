import Joi from 'joi';
import joiFormater from '../helpers/joiFormater';
import findUser from '../helpers/findUser';

const signUpValidator = async (req, res, next) => {
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
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  const { error } = Joi.validate(
    { firstname, lastname, email, password, confirmPassword },
    schema
  );
  if (error) {
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);
    return res.status(400).send({
      message: formatedMessage,
    });
  }
  const user = await findUser('email', email);
  if (user) {
    return res.status(409).send({
      message: 'email alredy exist',
    });
  }
  return next();
};

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string().required(),
  });
  const { error } = Joi.validate({ email, password }, schema);
  if (error) {
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);
    return res.status(400).send({
      message: formatedMessage,
    });
  }
  return next();
};

export default { signUpValidator, loginValidator };
