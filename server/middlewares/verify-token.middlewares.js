import validations from '../helpers/validations';

/**
 * @method verifyToken
 * @description Verifies the token provided by the user
 * @param {*} req
 * @param {*} res
 * @returns {*} - JSON response object
 */

const verifyToken = (req, res, next) => {
  const payload = validations.verifyAuthHeader(req);
  let error;
  let status;
  if (!payload || payload.error === 'error') {
    status = 401;
    error = 'You are not authorized';
  }
  if (payload.error === 'Invalid token') {
    status = 403;
    error = 'Forbidden';
  }
  if (error) {
    return res.status(status).json({
      errors: {
        body: [error],
      },
    });
  }
  req.user = payload;
  return next();
};

/**
 * @method verifyAdmin
 * @description Verifies the token provided by the Admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} - JSON response object
 */
const verifyAdmin = (req, res, next) => {
  const payload = validations.verifyAuthHeader(req);
  const { isAdmin } = payload;
  if (!isAdmin) {
    return res.status(403).json({
      errors: {
        body: ['You are not authorized to access this endpoint.'],
      },
    });
  }
  return next();
};

const tokenValidator = {
  verifyToken,
  verifyAdmin,
};

export default tokenValidator;
