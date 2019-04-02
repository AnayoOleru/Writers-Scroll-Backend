import model from '../models';
import validations from '../helpers/validations';

const { User } = model;

const middleware = {
  /**
   * @description Check for the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @param {function} next calls the next function
   * @returns {object} error for invalid id
   * @returns {object} error for user not found
   * @returns {function} next function
   */
  async checkIfUserExist(req, res, next) {
    if (!validations.verifyUUID(req.params.id)) {
      return res.status(400).json({
        error: 'id not valid',
      });
    }

    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    req.data = user;
    return next();
  },
};

export default middleware;
