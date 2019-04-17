import model from '../models';
import serverError from '../helpers/server-error';
import profileHelper from '../helpers/profiler';
import validations from '../helpers/validations';

const { User, Follower } = model;

/**
 * @description Controller to authenticate users
 */
const followController = {
  /**
   * @description user follow and unfollow each other
   * @param {*} req
   * @param {*} res
   * @param {followeeId} user to be followed
   * @param {followerId} person following the user
   * @returns {object} response and user profile data
   */
  async followUser(req, res) {
    try {
      const followerId = req.user.userObj.id;
      const { followeeId } = req.params;
      if (!validations.verifyUUID(followeeId)) {
        return res.status(400).json({
          errors: {
            body: ['id not valid'],
          },
        });
      }
      const findUnFollowee = await User.findOne({ where: { id: followeeId } });
      if (!findUnFollowee) {
        return res.status(404).json({
          errors: {
            body: ['User not found'],
          },
        });
      }
      if (findUnFollowee.id === followerId) {
        res.status(403).json({
          errors: {
            body: ["You can't follow yourself"],
          },
        });
      }
      // Get follow record
      const followRecord = await Follower.findOne({
        where: {
          followee_id: followeeId, // user to be followed
          follower_id: followerId, // person following the user.
        },
      });
      // Check if the user is currently following another user
      if (!followRecord) {
        await Follower.create({
          followee_id: followeeId,
          follower_id: followerId,
        });
        const userDetails = profileHelper.profiler(findUnFollowee);
        return res.status(201).json({
          message: 'You have successfully followed this user',
          user: userDetails,
        });
      }
      return res.status(403).json({
        errors: {
          body: ['You are already following this user'],
        },
      });
    } catch (error) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  },

  async unFollowUser(req, res) {
    try {
      const followerId = req.user.userObj.id;
      const { unFolloweeId } = req.params;
      if (!validations.verifyUUID(unFolloweeId)) {
        return res.status(400).json({
          errors: {
            body: ['id not valid'],
          },
        });
      }
      const findFollowee = await User.findOne({
        where: { id: unFolloweeId },
      });
      // Check if user exist
      if (!findFollowee) {
        return res.status(404).json({
          errors: {
            body: ['User not found'],
          },
        });
      }
      // Confirm if the user to be unfollow is the same as logged in user
      if (findFollowee.id === followerId) {
        return res.status(403).json({
          errors: {
            body: ["You can't unfollow yourself"],
          },
        });
      }
      // Get follow record.
      const followRecord = await Follower.findOne({
        where: {
          follower_id: followerId, //  person unfollowing the user.
          followee_id: unFolloweeId, // user to be unfollowed
        },
      });

      // Confirm if user is already unfollowing
      if (!followRecord) {
        return res.status(404).json({
          errors: {
            body: ['You are not currently following this user'],
          },
        });
      }
      // Unfollow a user
      await followRecord.destroy({
        where: {
          follower_id: followerId,
          followee_id: unFolloweeId,
        },
      });
      const userDetails = profileHelper.profiler(findFollowee);
      return res.status(200).json({
        message: 'You have successfully unfollowed this user',
        user: userDetails,
      });
    } catch (error) {
      return res.status(500).json({
        errors: serverError(),
      });
    }
  },
};
export default followController;
