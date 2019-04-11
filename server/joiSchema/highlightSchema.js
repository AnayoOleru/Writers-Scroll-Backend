import Joi from 'joi';

const highlightSchema = () => {
  const schema = Joi.object().keys({
    start_position: Joi.number()
      .integer()
      .required(),
    end_position: Joi.number()
      .integer()
      .required(),
    comment: Joi.string(),
  });
  return schema;
};

export default highlightSchema;
