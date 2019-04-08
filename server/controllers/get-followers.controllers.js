import models from '../models';
import validations from '../helpers/validations';
import serverError from '../helpers/server-error';

const { User, Follower } = models;

/**
 * @description Get all followers
 * @param {object} req
 * @param {object} res
 * @param {follower_id} person following a user
 * @param {followee_id} user to be followed
 * @return {undefined}
 */
const getFollowers = async (req, res) => {
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

    return res.status(200).json({
      message: 'Successfully retrieved all your followers',
      followers: users,
    });
  } catch (err) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

/**
 * @description Get all users you are following
 * @param {object} req
 * @param {object} res
 * @param {followee_id} user to be followed
 * @param {follower_id} person following a user
 * @return {undefined}
 */
const getFollowing = async (req, res) => {
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
      errors: serverError(),
    });
  }
};

const getFollowersController = { getFollowers, getFollowing };

export default getFollowersController;
