import Joi from 'joi';

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
};

export default validations;
