import Joi from 'joi';

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
};

export default validations;
