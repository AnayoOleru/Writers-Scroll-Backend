import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { authValidator } = middlewares;
const { authController } = controllers;

const authRoute = express.Router();

authRoute.post(
  '/login',
  authValidator.loginValidator,
  authController.loginController
);

authRoute.post(
  '/signup',
  authValidator.signUpValidator,
  authController.signupController
);

authRoute.patch('/verification/:token', authController.verifyEmail);

export default authRoute;
