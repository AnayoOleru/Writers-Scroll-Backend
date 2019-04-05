import db from '../models';
import authHelper from '../helpers/auth';
import searchDatabase from '../helpers/searchDatabase';
import emailSender from '../helpers/emailSender';

const { findUser } = searchDatabase;
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

/**
 * @description - this method create in a user
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - object
 */
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

    const verificationToken = authHelper.encode({ email });
    const verificationLink = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/verification/${verificationToken}`;

    await emailSender.signupEmail(email, verificationLink);

    return res.send({
      status: 200,
      user: { email, token, bio, image },
      message: 'Registration was successful',
    });
  } catch (err) {
    return res.send(serverError);
  }
};

/**
 * @description - this method logs in a user
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - object
 */
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decodedToken = authHelper.decode(token);
    const { email } = decodedToken.userObj;

    const user = await findUser(email);
    if (user.is_activated) {
      return res.send({
        status: 403,
        errors: {
          body: ['Your account has already been verified'],
        },
      });
    }
    const updateValue = { is_activated: true };
    await user.update(updateValue);
    return res.send({
      status: 200,
      message: 'Account verification was successful',
    });
  } catch (err) {
    return res.send(serverError);
  }
};

const socialCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const { id, displayName, emails, provider, photos } = profile;

    if (!emails) {
      const userWithNoEmail = { noEmail: true };
      return done(null, userWithNoEmail);
    }

    const userEmail = emails[0].value;
    const names = displayName.split(' ');
    const profileImage = photos[0].value;

    const [user] = await User.findOrCreate({
      where: { email: userEmail },
      defaults: {
        first_name: names[0],
        last_name: names[1],
        password: id,
        email: userEmail,
        social: provider,
        image_url: profileImage,
      },
    });

    return done(null, user.dataValues);
  } catch (err) {
    return err;
  }
};

/**
 * @description redirects user to the frontend
 * @param {object} req
 * @param {object} res
 * @returns {string} - Frontend url
 */
const socialRedirect = async (req, res) => {
  if (req.user.noEmail) {
    return res.redirect(`${process.env.FRONTEND_URL}/auth/social?error=${400}`);
  }

  const { id, email } = req.user;
  const token = await authHelper.encode({ id, email });
  return res.redirect(`${process.env.FRONTEND_URL}/auth/social?${token}`);
};

const authController = {
  loginController,
  signupController,
  verifyEmail,
  socialCallback,
  socialRedirect,
};

export default authController;
