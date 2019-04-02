import Joi from 'joi';
import Authenticate from './auth';

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
  verifyAuthHeader(req) {
    if (!req.headers.authorization) {
      return { error: 'error' };
    }
    const token = req.headers.authorization;
    const payload = Authenticate.decode(token);
    if (!payload) {
      return { error: 'Invalid token' };
    }
    return payload;
  },

  /**
   * @method verifyUser
   * @description Verifies the token provided by the user
   * @param {*} req
   * @param {*} res
   * @returns {*} - JSON response object
   */

  verifyUser(req, res, next) {
    const payload = validations.verifyAuthHeader(req);
    let error;
    let status;
    if (!payload || payload === 'error') {
      status = 401;
      error = 'You are not authorized';
    }
    if (payload.error === 'Invalid token') {
      status = 403;
      error = 'Forbidden';
    }
    if (error) {
      return res.status(status).json({ status, error });
    }
    req.user = payload;
    return next();
  },
  /**
   * @method verifyAdmin
   * @description Verifies the token provided by the Admin
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} - JSON response object
   */
  verifyAdmin(req, res, next) {
    const payload = validations.verifyAuthHeader(req);
    const { isAdmin } = payload;
    if (!isAdmin) {
      return res.status(403).json({
        status: 403,
        error: 'You are not authorized to access this endpoint.',
      });
    }
    return next();
  },
};

export default validations;
