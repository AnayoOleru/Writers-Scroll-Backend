import db from '../models';
import authHelper from '../helpers/auth';
import searchDatabase from '../helpers/search-database';
import notifications from '../helpers/notifications';
import serverError from '../helpers/server-error';

const { findUser } = searchDatabase;
const { User } = db;
const error = ['invalid username and/or password'];

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
    const user = await findUser(email);

    if (!user) {
      return res.status(401).json({
        errors: {
          body: error,
        },
      });
    }
    const {
      id,
      password: hashedPassword,
      is_admin: isAdmin,
      image_url: image,
      is_reviewer: isReviewer,
      is_activated: isActivated,
    } = user;
    const verifyPassword = authHelper.comparePassword(hashedPassword, password);

    if (!verifyPassword) {
      return res.status(401).json({
        errors: {
          body: error,
        },
      });
    }
    const token = authHelper.encode({
      id,
      email,
      isAdmin,
      isReviewer,
      isActivated,
    });

    return res.status(200).json({
      user: {
        token,
        image,
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: serverError(),
    });
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

    if (!user) {
      return res.status(204).json({ errors: { body: ['User not created'] } });
    }

    const {
      id,
      is_admin: isAdmin,
      first_name: firstName,
      is_reviewer: isReviewer,
    } = user;
    const token = authHelper.encode({ id, isAdmin, isReviewer });

    const verificationToken = authHelper.encode({ email });
    const verificationLink = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/verification/${verificationToken}`;

    await notifications.signupEmail(email, verificationLink, firstName);

    return res.status(200).json({
      user: { email, token },
    });
  } catch (err) {
    return res.status(500).json({
      errors: serverError(),
    });
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
      return res.status(403).json({
        errors: {
          body: ['Your account has already been verified'],
        },
      });
    }
    const updateValue = { is_activated: true };
    await user.update(updateValue);
    return res.status(200).json({
      message: 'Account verification was successful',
    });
  } catch (err) {
    return res.status(500).json({
      errors: serverError(),
    });
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
