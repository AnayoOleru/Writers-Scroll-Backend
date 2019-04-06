import model from '../models';
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
      const token = validations.verifyAuthHeader(req);
      const { id: followerId } = token.userObj;
      const { followeeId } = req.params;
      // Get followee from followee table
      const findUnFollowee = await User.findOne({ where: { id: followeeId } });
      if (!findUnFollowee) {
        return res.status(404).json({
          status: 404,
          message: 'User not found',
        });
      }
      if (findUnFollowee.id === followerId) {
        res.status(403).json({
          status: 403,
          message: 'You cant follow yourself',
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

        return res.status(201).json({
          status: 201,
          message: `Successfully followed user`,
        });
      }
      return res.status(403).json({
        status: 403,
        message: 'You are already following',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  },

  async unFollowUser(req, res) {
    try {
      const token = validations.verifyAuthHeader(req);
      const { id: followerId } = token.userObj;
      const { unFolloweeId } = req.params;
      const findFollowee = await User.findOne({
        where: { id: unFolloweeId },
      });
      // Check if user exist
      if (!findFollowee) {
        return res.status(404).json({
          status: 404,
          message: 'User not found',
        });
      }
      // Confirm if the user to be unfollow is the same as logged in user
      if (findFollowee.id === followerId) {
        return res.status(403).json({
          status: 403,
          message: 'You cant unfollow yourself',
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
          message: 'You are already unfollowing user',
        });
      }
      // Unfollow a user
      await followRecord.destroy({
        where: {
          follower_id: followerId,
          followee_id: unFolloweeId,
        },
      });
      return res.status(200).json({
        status: 200,
        message: 'Successfully unfollowed user',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Server error',
      });
    }
  },
};
export default followController;
