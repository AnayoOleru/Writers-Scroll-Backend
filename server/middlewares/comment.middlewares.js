import Joi from 'joi';
import joiFormater from '../helpers/joi-formater';
import commentSchema from '../joiSchema/commentSchema';

const validateComment = (req, res, next) => {
  const { error } = Joi.validate(req.body, commentSchema());

  if (error) {
    const { message } = error.details[0];
    const formatedMessage = joiFormater(message);
    return res.status(400).json({
      errors: {
        body: [formatedMessage],
      },
    });
  }
  return next();
};

export default { validateComment };
