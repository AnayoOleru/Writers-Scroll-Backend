import model from '../models';
import validations from '../helpers/validations';
import profileHelper from '../helpers/profiler';
import serverError from '../helpers/server-error';

const { User, Follower } = model;

/**
 * @description Get User Profile
 * @param {*} req
 * @param {*} res
 * @returns {object} response and user profile data
 */
const getUserProfile = async (req, res) => {
  try {
    if (!validations.verifyUUID(req.params.id)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }

    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'title',
        'phone_number',
        'email',
        'is_reviewer',
        'research_field',
        'image_url',
        'bio',
        'is_activated',
        'is_reported',
        'is_notified',
        'createdAt',
        'updatedAt',
      ],
    });

    const isFollower = await Follower.findOne({
      where: {
        followee_id: req.user.userObj.id,
        follower_id: req.params.id,
      },
    });

    const isFollowing = await Follower.findOne({
      where: {
        follower_id: req.user.userObj.id,
        followee_id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        errors: {
          body: ['User not found'],
        },
      });
    }

    return res.status(200).json({
      profile: user,
      isFollower: profileHelper.followStatus(isFollower),
      isFollowing: profileHelper.followStatus(isFollowing),
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const getProfileByField = async (req, res) => {
  try {
    if (!validations.validProfileQueryString(req.query)) {
      return res.status(400).json({
        errors: {
          body: ['Invalid query string'],
        },
      });
    }
    const users = await User.findAll({
      where: req.query,
      attributes: [
        'id',
        'first_name',
        'last_name',
        'title',
        'phone_number',
        'email',
        'is_reviewer',
        'research_field',
        'image_url',
        'bio',
        'is_activated',
        'is_reported',
        'is_notified',
        'createdAt',
        'updatedAt',
      ],
    });

    return res.status(200).json({
      profiles: users,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const patchProfile = async (req, res) => {
  try {
    if (!validations.verifyUUID(req.params.id)) {
      return res.status(400).json({
        errors: {
          body: ['id not valid'],
        },
      });
    }
    const updateBody = req.body;

    const userProfile = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!userProfile) {
      return res.status(404).json({
        eerrors: {
          body: ['User not found'],
        },
      });
    }

    const { userObj } = req.user;
    if (!validations.compareFieldWithToken(userObj.id, req.params.id)) {
      return res.status(403).json({
        errors: {
          body: ['User does not own this account'],
        },
      });
    }

    const user = await userProfile.update(updateBody);

    const profile = profileHelper.profiler(user);

    return res.status(200).json({
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const suggestedResearchers = (req, res) =>
  res.status(200).json({
    suggestion: req.suggestions,
  });

const controller = {
  getUserProfile,
  getProfileByField,
  patchProfile,
  suggestedResearchers,
};

export default controller;
