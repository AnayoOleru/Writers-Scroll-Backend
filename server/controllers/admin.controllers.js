import model from '../models';
import serverError from '../helpers/server-error';
import profileHelper from '../helpers/profiler';
import validations from '../helpers/validations';

const { User, Request } = model;
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
  const userId = req.params.id;
  try {
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
    // check if user exists in the database
    if (!findUser) {
      return res.status(403).json({
        errors: {
          body: ['user not found'],
        },
      });
    }
    // Give user a reveiwer access
    if (findUser) {
      const userUpgrade = await findUser.update({
        is_reviewer: true,
      });
      const userDetails = profileHelper.profiler(userUpgrade);
      return res.status(200).json({
        message: 'You have granted a user reviewer access',
        user: userDetails,
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
  const userId = req.params.id;
  try {
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
    // Check if user exists in the database
    if (!findUser) {
      return res.status(404).json({
        errors: {
          body: ['User not found'],
        },
      });
    }
    // Deactivate user reveiwer access
    if (findUser) {
      const downgradeUser = await findUser.update({ is_reviewer: false });
      const userDetails = profileHelper.profiler(downgradeUser);
      return res.status(200).json({
        message: 'You have removed a user reviewer access',
        user: userDetails,
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

const getAllReviewerRequests = async (req, res) => {
  const userId = req.user.userObj.id;
  try {
    // Is user id correct?
    if (!validations.verifyUUID(userId)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }
    const getAllUsersRequest = await Request.findAll({
      where: {
        is_reviewer: false,
        is_reported: false,
      },
    });
    if (getAllUsersRequest) {
      return res.status(200).json({
        message: 'List of users requesting to be reviewers',
        allUsersRequest: getAllUsersRequest,
      });
    }
    return res.status(404).json({
      errors: {
        body: ['No request found!'],
      },
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const getAllReviewers = async (req, res) => {
  const userId = req.user.userObj.id;
  try {
    // Is user id correct?
    if (!validations.verifyUUID(userId)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }
    const getReviewers = await User.findAll({
      where: {
        is_reviewer: true,
      },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'title',
        'phone_number',
        'email',
        'is_reviewer',
        'is_reported',
        'research_field',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!getReviewers) {
      return res.status(404).json({
        errors: {
          body: ['No reviewers found!'],
        },
      });
    }
    return res.status(200).json({
      message: 'List of users that are reviewers',
      allReviewers: getReviewers,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};
const usersRequest = {
  activateReviewer,
  deactivateReviewer,
  getAllReviewerRequests,
  getAllReviewers,
};
export default usersRequest;
