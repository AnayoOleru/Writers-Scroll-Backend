import db from '../models';
import authHelper from '../helpers/auth';

const { User } = db;
const error = ['invalid username and/or password'];
const serverError = {
  status: 500,
  message: 'Server error, please try again later',
};
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
    return res.send(serverError);
  }
};

const signupController = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await User.create({
      first_name: firstname,
      last_name: lastname,
      email,
      password,
    });

    if (!user) return res.send({ status, errors: { body: error } });

    const { id, is_admin: isAdmin, bio, image_url: image } = user;
    const token = authHelper.encode({ id, email, isAdmin });

    return res.send({
      status: 200,
      user: { email, token, bio, image },
      message: 'Registration was successful',
    });
  } catch (err) {
    return res.send(serverError);
  }
};

const authController = { loginController, signupController };

export default authController;
