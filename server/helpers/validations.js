import Joi from 'joi';

const validateArticlePage = page => {
  const schema = Joi.number().integer();
  const { error } = Joi.validate(page, schema);

  if (error) {
    return false;
  }
  return true;
};

const validations = {
  /**
   * @description Validate UUIDs
   * @param {string} uuid
   * @returns {boolean} valid uuid
   */
  verifyUUID(uuid) {
    const schema = Joi.string().guid({
      version: ['uuidv4'],
    });

    const { error } = Joi.validate(uuid, schema);
    if (error) {
      return false;
    }
    return true;
  },
  validateArticlePage,
};

export default validations;
