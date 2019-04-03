import model from '../models';

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
    const { followeeId } = req.body;
    try {
      // Get user you want to follow
      const followee = await User.findOne({
        where: {
          id: followeeId,
        },
      });
      if (!followee) {
        return res.status(404).json({
          status: 404,
          message: `User does not exist`,
        });
      }
      if (followee.id === followeeId) {
        return res.status(403).json({
          status: 403,
          message: 'Sorry, You cant follow yourself',
        });
      }

      const followUserRecord = await Followers.findOne({
        where: {
          user_id: followee.id,
          follower_id: followeeId,
        },
      });

      // Check if user is currently following
      if (!followUserRecord) {
        await Followers.create({
          user_id: followee.id,
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
        message: `Sorry, unable to follow user`,
      });
    }
  },
};
export default followUnfollowUser;
