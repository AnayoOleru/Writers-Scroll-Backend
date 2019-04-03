import notification from '../helpers/notifications';
import Authenticate from '../helpers/auth';
import model from '../models';

const { User } = model;

const { hashPassword } = Authenticate;

const ResetPasswordController = {
  async updatePassword(req, res) {
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
          status: 200,
          message: 'password reset successful',
        });
        notification.passwordReset(email);
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  acceptRequest(req, res) {
    res
      .status(200)
      .redirect(
        `${req.protocol}://${req.get('host')}/api/v1/auth/reset/message`
      );
  },
};
export default ResetPasswordController;
