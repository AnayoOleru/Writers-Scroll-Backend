import dotenv from 'dotenv';
import notification from '../helpers/notifications';
import Authenticate from '../helpers/auth';
import model from '../models';
import serverError from '../helpers/server-error';

dotenv.config();
const { User } = model;

const { hashPassword } = Authenticate;

const updatePassword = async (req, res) => {
  try {
    const { email } = req.user;
    const hashedPassword = hashPassword(req.body.password);
    const newPassword = await User.update(
      { password: hashedPassword },
      {
        where: { email },
        returning: true,
      }
    );

    if (newPassword.length) {
      res.status(200).json({
        message: 'password reset successful',
      });
      await notification.passwordReset(email);
    }
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const acceptRequest = (req, res) => {
  const { FRONTEND_PASSWORD_RESET_URL } = process.env;
  res
    .status(200)
    .redirect(`${FRONTEND_PASSWORD_RESET_URL}?token=${req.params.token}`);
};

const ResetPasswordController = { updatePassword, acceptRequest };

export default ResetPasswordController;
