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
  validProfileQueryString(query) {
    let valid = true;
    const searchableProfileFields = [
      'first_name',
      'last_name',
      'title',
      'email',
      'is_reviewer',
      'research_field',
    ];

    Object.keys(query).forEach(item => {
      if (!searchableProfileFields.includes(item)) {
        valid = false;
      }
    });

    return valid;
  },
};

export default validations;
