import db from '../models';
import authHelper from '../helpers/auth';

const { User } = db;
const error = ['invalid username and/or password'];
const status = 401;

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
      message: 'login was successfull',
    });
  } catch (err) {
    return res.send({ status: 500, message: 'server error, please try later' });
  }
};

const authController = { loginController };

export default authController;
