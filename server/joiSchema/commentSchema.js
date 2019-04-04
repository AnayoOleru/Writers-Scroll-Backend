import Joi from 'joi';
import validations from '../helpers/validations';

const comment = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    user_id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
    article_id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
    body: Joi.string()
      .min(1)
      .max(250)
      .required(),
  });

  Joi.validate(data, schema, err => {
    validations.validateInput(err, res, next);
  });
};

export default comment;
