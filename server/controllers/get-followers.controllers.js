import models from '../models';
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
    const userId = req.user.userObj.id;
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
            'image_url',
          ],
        },
      ],
    });

    return res.status(200).json({
      message: 'You have successfully retrieved all your followers',
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
  const userId = req.user.userObj.id;
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
            'image_url',
          ],
        },
      ],
    });

    return res.status(200).json({
      message:
        'You have successfully retrieved all the users you are following',
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
