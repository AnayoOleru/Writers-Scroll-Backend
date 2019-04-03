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
   * @params {string} uuids
   * @returns {boolean} valid uuid
   */
  verifyUUID(...args) {
    let valid = true;
    const schema = Joi.string().guid({
      version: ['uuidv4'],
    });

    Object.keys(args).forEach(uuid => {
      const { error } = Joi.validate(args[uuid], schema);
      if (error) {
        valid = false;
      }
    });

    if (!valid) {
      return false;
    }

    return true;
  },
  validateArticlePage,
};

export default validations;
