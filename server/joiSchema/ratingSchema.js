import Joi from 'joi';

import validations from '../helpers/validations';

const rating = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object().keys({
    article_id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
    rating_value: Joi.number()
      .min(0)
      .max(5)
      .required(),
  });

  Joi.validate(data, schema, err => {
    validations.validateInput(err, res, next);
  });
};

export default rating;
