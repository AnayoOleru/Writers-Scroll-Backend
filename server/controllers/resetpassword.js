import notification from '../helpers/notifications';
import Authenticate from '../helpers/auth';
import model from '../models';

const { User } = model;

const { hashPassword } = Authenticate;

const ResetPasswordController = {
  async updatePassword(req, res) {
    const { userObj } = req.user;
    const hashedPassword = hashPassword(req.body.password);

    const newPassword = await User.update(
      { password: hashedPassword },
      {
        where: { email: userObj },
        returning: true,
      }
    );

    if (newPassword.length) {
      res.status(200).json({
        status: 200,
        message: 'password reset successful',
      });
      notification.passwordReset(userObj);
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
