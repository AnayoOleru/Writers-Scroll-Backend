import express from 'express';
import ResetPasswordMiddleware from '../middlewares';
import ResetPasswordController from '../controllers';
import Validation from '../helpers/validations';

const {
  validateEmail,
  createToken,
  validateToken,
  verifyEmailToken,
  mailer,
} = ResetPasswordMiddleware;

const { verifyEmail, validatePassword } = Validation;

const { acceptRequest, updatePassword } = ResetPasswordController;
const resetPasswordRouter = express.Router();

resetPasswordRouter.post(
  '/reset',
  verifyEmail,
  validateEmail,
  createToken,
  mailer
);

resetPasswordRouter.get('/reset/:token/password', validateToken, acceptRequest);

resetPasswordRouter.get('/reset/message', (req, res) => {
  res.send('Thank you for requesting a password reset.');
});

resetPasswordRouter.post(
  '/new_password',
  validatePassword,
  verifyEmailToken,
  updatePassword
);

export default resetPasswordRouter;
