import db from '../models';
import authHelper from '../helpers/auth';

const { User } = db;
const error = ['invalid username and/or password'];
const status = 401;

/**
 * @description - this method logs in a user
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - object
 */
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.send({
        status,
        errors: {
          body: error,
        },
      });
    }
    const {
      id,
      password: hashedPassword,
      is_admin: isAdmin,
      bio,
      image_url: image,
    } = user;
    const verifyPassword = authHelper.comparePassword(hashedPassword, password);

    if (!verifyPassword) {
      return res.send({
        status,
        errors: {
          body: error,
        },
      });
    }
    const token = authHelper.encode({ id, email, isAdmin });

    return res.send({
      status: 200,
      user: {
        email,
        token,
        bio,
        image,
      },
      message: 'Login was successful',
    });
  } catch (err) {
    return res.send({
      status: 500,
      message: 'Server error, please try again later',
    });
  }
};

const authController = { loginController };

export default authController;
