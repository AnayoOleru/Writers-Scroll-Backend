import sendEmail from '../config/email';
import template from './template';

const Notification = {
  forgetPassword(email, link) {
    const subject = 'Password Reset';
    const message = template(
      `<p>You requested for a password reset</p> <p>follow this link to reset your password <a href=${link}>Reset my password</a></p><br><b>Please note that this link expires in 12hours and you can only use it once</b><p>If you didn't request for a password reset, ignore this email and nothing will happen</p>`
    );

    sendEmail(email, subject, message);
  },

  passwordReset(email) {
    const subject = 'Password was changed';
    const message = template('<p>Your password was changed successfuly</p>');

    sendEmail(email, subject, message);
  },
};

export default Notification;
