import models from '../models';
import validations from '../helpers/validations';

const { User, Follower } = models;
const serverError = {
  status: 500,
  message: 'Server error, please try again later',
};

const getFollowersController = {
  /**
   * @description Get all followers
   * @param {object} req
   * @param {object} res
   * @param {follower_id} person following a user
   * @param {followee_id} user to be followed
   * @return {undefined}
   */
  async getFollowers(req, res) {
    try {
      const token = validations.verifyAuthHeader(req);
      const { id: userId } = token.userObj;
      const users = await Follower.findAll({
        where: {
          followee_id: userId,
        },
        include: [
          {
            model: User,
            as: 'follower',
            attributes: [
              'id',
              'first_name',
              'last_name',
              'title',
              'phone_number',
              'email',
              'bio',
            ],
          },
        ],
      });
      if (users.length < 1) {
        return res.status(200).json({
          status: 200,
          errors: {
            body: ['Your followers list is empty'],
          },
        });
      }
      return res.status(200).json({
        message: 'Successfully retrieved all your followers',
        followers: users,
      });
    } catch (err) {
      return res.status(500).json({
        errors: {
          body: [serverError],
        },
      });
    }
  },

  /**
   * @description Get all users you are following
   * @param {object} req
   * @param {object} res
   * @param {followee_id} user to be followed
   * @param {follower_id} person following a user
   * @return {undefined}
   */
  async getFollowing(req, res) {
    const token = validations.verifyAuthHeader(req);
    const { id: userId } = token.userObj;
    try {
      const users = await Follower.findAll({
        where: { follower_id: userId },
        include: [
          {
            model: User,
            as: 'followee',
            attributes: [
              'id',
              'first_name',
              'last_name',
              'title',
              'phone_number',
              'email',
              'bio',
            ],
          },
        ],
      });
      if (users.length < 1) {
        return res.status(200).json({
          status: 200,
          errors: {
            body: ['Sorry, you are not following anyone'],
          },
        });
      }
      return res.status(200).json({
        message: 'Successfully retrieved all users you are following',
        following: users,
      });
    } catch (errors) {
      return res.status(500).json({
        errors: {
          body: [serverError],
        },
      });
    }
  },
};
export default getFollowersController;
