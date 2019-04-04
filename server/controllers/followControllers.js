import model from '../models';
import authHelper from '../helpers/auth';

const { User, Followers } = model;

/**
 * @description Controller to authenticate users
 */
const followUnfollowUser = {
  /**
   * @description This controller method handles follow a user
   *
   * @param {*} req
   * @param {*} res
   * @return {*} object
   */
  async followUser(req, res) {
    try {
      // Get user you want to follow
      const token = authHelper.encode({
        id: '7142e4ff-366d-46cc-9384-40eadb3b2626',
        email: 'sojida@gmail.com',
        isAdmin: false,
      });
      const decodToken = authHelper.decode(token);
      const { id: followerId } = decodToken.userObj;
      const { followeeId } = req.body;
      const checkFollowee = await User.findOne({
        where: { id: followerId },
      });
      if (!checkFollowee) {
        return res.status(404).json({
          status: 404,
          message: `User does not exist`,
        });
      }
      if (checkFollowee.id === followerId) {
        return res.status(403).json({
          status: 403,
          message: 'Sorry, You cant follow yourself',
        });
      }
      const followUserRecord = await Followers.findOne({
        where: {
          followee_id: checkFollowee.id,
          follower_id: followerId,
        },
      });

      // Check if user is currently following
      if (!followUserRecord) {
        await Followers.create({
          user_id: checkFollowee.id,
          follower_id: followeeId,
        });

        res.status(201).json({
          status: 201,
          message: `Successfuly followed user`,
        });
      } else {
        res.status(403).json({
          status: 403,
          message: 'Forbidden, You are already following the user',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: `Sorry, something went wrong`,
      });
    }
  },
};
export default followUnfollowUser;
