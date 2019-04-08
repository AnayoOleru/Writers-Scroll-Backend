import express from 'express';
import middlewares from '../middlewares';
import controllers from '../controllers';
import validations from '../helpers/validations';

const { ResetPasswordMiddleware } = middlewares;

const { ResetPasswordController } = controllers;
const resetPasswordRouter = express.Router();

resetPasswordRouter.post(
  '/reset',
  validations.verifyEmail,
  ResetPasswordMiddleware.validateEmail,
  ResetPasswordMiddleware.createToken,
  ResetPasswordMiddleware.mailer
);

resetPasswordRouter.get(
  '/reset/:token/password',
  ResetPasswordMiddleware.validateToken,
  ResetPasswordController.acceptRequest
);

resetPasswordRouter.get('/reset/message', (req, res) => {
  res.send('Thank you for requesting a password reset.');
});

resetPasswordRouter.post(
  '/new_password',
  validations.validatePassword,
  ResetPasswordMiddleware.verifyEmailToken,
  ResetPasswordMiddleware.isOldPassword,
  ResetPasswordController.updatePassword
);

export default resetPasswordRouter;
