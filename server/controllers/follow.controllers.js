import model from '../models';
import validations from '../helpers/validations';

const { User, Follower } = model;

/**
 * @description Controller to authenticate users
 */
const followController = {
  async followUser(req, res) {
    try {
      const token = validations.verifyAuthHeader(req);
      const { id: followerId } = token.userObj;
      const { followeeId } = req.params;
      // Get followee from followee table
      const findUnFollowee = await User.findOne({ where: { id: followeeId } });
      if (!findUnFollowee) {
        res.status(404).json({
          status: 404,
          message: 'User not found',
        });
      }
      if (findUnFollowee.id === followerId) {
        res.status(406).json({
          status: 406,
          message: 'You cant follow yourself',
        });
      }
      // Is follower already following followee?
      const getllFollowerRecord = await Follower.findAll();
      const userFollowing = getllFollowerRecord
        .map(follower => follower)
        .filter(
          followed =>
            followed.follower_id === followerId &&
            followed.followee_id === followeeId
        );
      if (userFollowing.length > 0) {
        res.status(406).json({
          status: 406,
          message: 'You are already following',
        });
      }
      // follow a user
      const following = await Follower.create({
        follower_id: followerId,
        followee_id: followeeId,
      });
      res.status(201).json({
        status: 201,
        message: 'Successfully followed user',
        following,
      });
    } catch (error) {
      res.status(500).json({
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
      // Get followee from followee table
      const findUnFollowee = await User.findOne({
        where: { id: unFolloweeId },
      });
      if (!findUnFollowee) {
        return res.status(404).json({
          status: 404,
          message: 'User not found',
        });
      }
      if (findUnFollowee.id === followerId) {
        return res.status(406).json({
          status: 406,
          message: 'You cant follow yourself',
        });
      }
      // Is follower already following followee?
      const getllFollowerRecord = await Follower.findAll();
      const userFollowing = getllFollowerRecord
        .map(follower => follower)
        .filter(
          followed =>
            followed.follower_id === followerId &&
            followed.followee_id === unFolloweeId
        );
      if (userFollowing.length <= 0) {
        return res.status(406).json({
          status: 406,
          message: 'You are already unfollowing user',
        });
      }
      // unfollow a user
      const following = await Follower.destroy({
        where: {
          follower_id: followerId,
          followee_id: unFolloweeId,
        },
      });
      return res.status(200).json({
        status: 200,
        message: 'Successfully unfollowed user',
        following,
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
