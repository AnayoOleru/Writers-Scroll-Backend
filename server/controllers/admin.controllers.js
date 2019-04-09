/* eslint-disable camelcase */
import model from '../models';
import serverError from '../helpers/server-error';
import validations from '../helpers/validations';

const { User } = model;
/**
 *@class Admin
 *@description Admin Controller
 *@exports Admin
 */
/**
 * @method activateReviewer
 * @description Admin priviledges
 * @param {Object} req
 * @param {Object} res
 * @returns {undefined}
 */
const activateReviewer = async (req, res) => {
  const adminId = req.user.userObj.id;
  const userId = req.params.id;
  try {
    // Is user an admin?
    if (adminId === userId) {
      return res.status(403).json({
        errors: {
          body: ['You are already an admin'],
        },
      });
    }
    // Is user id correct?
    if (!validations.verifyUUID(req.params.id)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }
    const findUser = await User.findOne({
      where: { is_reviewer: false, id: userId },
    });
    // Give user a reveiwer access
    if (findUser) {
      const userUpgrade = await findUser.update({ is_reviewer: true });
      return res.status(200).json({
        message: 'You have granted a user reviewer access',
        user: userUpgrade,
      });
    }
    return res.status(403).json({
      errors: {
        body: ['You have already given user a reviewer access'],
      },
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};
/**
 * @method deactivateReviewer
 * @description Admin priviledges
 * @param {*} req
 * @param {*} res
 * @returns {undefined}
 */
const deactivateReviewer = async (req, res) => {
  const adminId = req.user.userObj.id;
  const userId = req.params.id;
  try {
    // Is user an admin?
    if (adminId === userId) {
      return res.status(400).json({
        errors: {
          body: ['User is not a reviewer'],
        },
      });
    }
    // Is user id correct?
    if (!validations.verifyUUID(req.params.id)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }
    const findUser = await User.findOne({
      where: { is_reviewer: true, id: userId },
    });
    // Deactivate user reveiwer access
    if (findUser) {
      const downgrade = await findUser.update({ is_reviewer: false });
      return res.status(200).json({
        message: 'You have removed a user reviewer access',
        user: downgrade,
      });
    }
    return res.status(403).json({
      errors: {
        body: ['You have already removed a user reviewer access'],
      },
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const upgradeDegradeUserReviewer = { activateReviewer, deactivateReviewer };
export default upgradeDegradeUserReviewer;
