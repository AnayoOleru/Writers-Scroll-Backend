import Joi from 'joi';

const profileSchema = () => {
  const schema = Joi.object().keys({
    first_name: Joi.string()
      .min(3)
      .max(30),
    last_name: Joi.string()
      .min(3)
      .max(30),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    title: Joi.string()
      .min(3)
      .max(30),
    bio: Joi.string()
      .min(1)
      .max(250),
    image_url: Joi.string()
      .min(1)
      .max(250),
    research_field: Joi.string()
      .min(1)
      .max(50),
  });
  return schema;
};

export default profileSchema;
