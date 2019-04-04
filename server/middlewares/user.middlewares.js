import Joi from 'joi';
import joiFormater from '../helpers/joiFormater';
import search from '../helpers/searchDatabase';
import signupSchema from '../joiSchema/signupSchema';
import loginSchema from '../joiSchema/loginSchema';

const { findUser } = search;

const signUpValidator = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    const { error } = Joi.validate(
      { firstname, lastname, email, password, confirmPassword },
      signupSchema()
    );
    if (error) {
      const { message } = error.details[0];
      const formatedMessage = joiFormater(message);
      return res.status(400).send({
        message: formatedMessage,
      });
    }
    const user = await findUser(email);
    if (user) {
      return res.status(409).send({
        message: 'Email already exists',
      });
    }
  } catch (err) {
    return err;
  }
  return next();
};

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = Joi.validate({ email, password }, loginSchema());
  if (error) {
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);
    return res.status(400).send({
      message: formatedMessage,
    });
  }
  return next();
};

const authValidator = { signUpValidator, loginValidator };

export default authValidator;
